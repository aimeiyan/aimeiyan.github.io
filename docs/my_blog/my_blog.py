__author__ = 'nancy'
# -*- coding: utf-8 -*-
import tornado.ioloop
import tornado.web
import json
import MySQLdb
import random
import string
import hashlib
import hmac
import redis

SECRET = 'imsosecret'

session_store = redis.Redis(host='localhost', port=6379)


def hash_str(s):
    return hmac.new(SECRET, s).hexdigest()


def make_secure_val(s):
    return "%s|%s" % (s, hash_str(s))


def check_secure_val(h):
    val = h.split('|')[0]
    if h == make_secure_val(val):
        return val


class MyHandler(tornado.web.RequestHandler):
    session_cookie_key = "session-id"

    def __init__(self, *args, **kwargs):
        super(MyHandler, self).__init__(*args, **kwargs)

        if 'visit_time' not in self.get_current_user():
            import time

            self.set_user_data('visit_time', int(time.time()))
        self.db = MySQLdb.connect(db="Dreams", user="root", passwd="123456", host="localhost", charset='utf8')
        self.db.autocommit(True)
        self.set_user_id()

    def set_user_id(self):
        self.email_address, self.is_logined, self.user_id = None, False, 0
        current_user = self.get_current_user()
        print current_user
        if 'userid' in current_user:
            userid = current_user['userid']
            self.user_id = userid
            self.is_logined = True
            c = self.db.cursor()
            c.execute('select email from authentications where id = %s', userid)
            self.email_address = c.fetchone()[0]

    def render(self, template_name, **kwargs):
        kwargs['login_email'] = self.email_address
        super(MyHandler, self).render(template_name, **kwargs)

    def get_current_user(self):
        if MyHandler.session_cookie_key in self.cookies:
            session_id = self.cookies[MyHandler.session_cookie_key]
            return session_store.hgetall(session_id.value) or {}
        return {}

    def set_user_data(self, key, value):
        if MyHandler.session_cookie_key in self.cookies:
            session_id = self.cookies[MyHandler.session_cookie_key].value
        else:
            import uuid

            session_id = uuid.uuid4().hex
            self.set_cookie(name=MyHandler.session_cookie_key, value=session_id, expires_days=1)

        session_store.hset(session_id, key, value)
        if key == 'userid':
            self.set_user_id()


class SaveHandler(MyHandler):
    def get(self, *args, **kwargs):
        self.render("write_blog.html", login_email_address=self.email_address)

    def post(self, edit_data_id, *args, **kwargs):
        if not self.is_logined:
            self.redirect('/s/login.html')
            return

        title = self.get_argument('blog-title', u'')
        article = self.get_argument('article', u'application/json')

        # self.set_header('Content-Type', 'application/json')
        # data = {'title': title.encode('utf8'), 'article': article.}
        # print data
        c = self.db.cursor()
        # c.execute("DROP TABLE IF EXISTS DREAMS")
        # c.execute("""CREATE TABLE DREAMS(ID INT PRIMARY KEY AUTO_INCREMENT,
        #                                    TITLE varchar(128) not null,
        #                                    ARTICLE LONGTEXT) CHARSET=utf8""")
        # for key, value in data.items():
        # if edit_data_id:
        c.execute("update dreams set title=%s,article=%s where id=%s", (title, article, edit_data_id))
        # else:
        #     c.execute("insert into dreams(title, article,userid) values (%s, %s, %s)", (title, article, self.user_id))
        # self.db.commit()

        # c.execute('select id, title, article, create_time from dreams')
        # results = cursor.fetchall()
        # for id, title, create_time, article in c:
        # Now print fetched result
        # print "id=%s,title=%s,article=%s,create_time=%s" % (id, title, create_time, article)

        c.close()

        self.redirect("/bloglist")


class CreateHandler(MyHandler):
    def get(self, *args, **kwargs):
        self.render("write_blog.html", login_email_address=self.email_address)

    def post(self, *args, **kwargs):
        if not self.is_logined:
            self.redirect("/s/login.html")
            return
        title = self.get_argument('blog-title', u'')
        article = self.get_argument('article', u'application/json')
        c = self.db.cursor()
        c.execute("insert into dreams(title, article,userid) values (%s, %s, %s)", (title, article, self.user_id))
        c.close()
        self.redirect('/bloglist')


class Blog:
    def __init__(self, id, title, create_time, article, userid):
        self.id = id
        self.title = title
        self.create_time = create_time
        self.article = article
        self.userid = userid


class DeleteHandler(MyHandler):
    def post(self, a, data):
        blog_del_id = self.get_argument(data)
        c = self.db.cursor()
        c.execute("delete form dreams where id=%s", blog_del_id)
        self.redirect("/bloglist")


class ShowHandler(MyHandler):
    def get(self, *args, **kwargs):
        page = int(self.get_argument('page', '1'))
        c = self.db.cursor()
        c.execute(
            'select id, title, create_time, article, userid from dreams where userid=%s order by create_time desc limit 10 offset %s',
            (self.user_id, (page - 1) * 10))
        # results = c.fetchall()
        blogs = []
        for id, title, create_time, article, userid in c:
            artvar = article.split('\r\n')[0]
            blogs.append(Blog(id, title, create_time, artvar, userid))
            # print blogs

        c = self.db.cursor()
        c.execute('select count(*) from dreams where userid=%s', self.user_id)
        total = c.fetchone()[0]

        c = self.db.cursor()
        c.execute(
            'select id, title, create_time, article, userid from dreams where userid=%s order by create_time desc limit 25',
            self.user_id)
        lists = []
        for id, title, create_time, article, userid in c:
            lists.append(Blog(id, title, create_time, article, userid))

        self.render(
            "blog-list.html",
            blogs=blogs,
            lists=lists,
            login_email_address=self.email_address,
            pages=range(1, (total / 10) + 2)
        )

    def post(self, id):
        c = self.db.cursor()
        c.execute("delete from dreams where id=%s", id)
        self.redirect("/bloglist")


class Comment:
    def __init__(self, id, blogid, author, message, create_time):
        self.id = id
        self.blogid = blogid
        self.author = author
        self.message = message
        self.create_time = create_time


class BlogHandler(MyHandler):
    def get(self, blog_id):
        db = self.db
        c = db.cursor()
        c.execute("""select id, title, create_time, article from dreams where id=%s""", blog_id)
        column_names = [d[0] for d in c.description]
        blogs = c.fetchall()

        c = db.cursor()
        c.execute("""select id, blogid, author,message, create_time from comment where blogid=%s""", blog_id)
        comments = []
        for id, blogid, author, message, create_time in c:
            comments.append(Comment(id, blogid, author, message, create_time))
            print comments

        current_user = self.get_current_user()
        login_username_id = current_user['userid']
        c = db.cursor()
        c.execute(
            'select id, title, create_time, article ,userid from dreams where userid=%s order by create_time desc limit 25',
            login_username_id)
        lists = []
        for id, title, create_time, article, userid in c:
            lists.append(Blog(id, title, create_time, article, userid))

        if len(blogs):
            blog = blogs[0]
            # print blog, '[[[[[[[[[[[[[[]]]]]]]]]]]'
            data = dict(zip(column_names, blog))
            print data, '*****************'
            print data['id'], '---', data['title'], '---', data['create_time'], '---', data['article']
            # self.render("blog-detail.html", **data)  #jiang data dasan chuan gei html
            self.render("blog-detail.html", blog_detail_id=data['id'], blog_detail_title=data['title'],
                        blog_detail_create_time=data['create_time'],
                        blog_detail_article=data['article'], login_email_address=self.email_address, comments=comments,
                        lists=lists)
        else:
            self.set_status(404)
            self.write('not found')


class CommentHandler(MyHandler):
    def post(self, *args, **kwargs):
        author = self.get_argument('author', u'')
        blogid = self.get_argument('id_name', u'')
        message = self.get_argument('message', u'application/json')
        print blogid, '--------'
        print author, '$$$'
        print message, '++++++++'
        db = self.db
        c = db.cursor()
        row_cnt = c.execute("insert into comment(blogid,author,message) values (%s, %s, %s)", (blogid, author, message))
        commentid = db.insert_id()
        c.close()
        db.commit()
        data = {"author": author, "id_name": commentid, "message": message}
        self.write(json.dumps(data))
        # self.redirect(self.request.path)
        # self.redirect('%s#comment-%d' % (self.request.path, commentid))


def make_salt():
    return ''.join(random.choice(string.letters) for x in range(5))


def make_pw_hash(email, pw, salt=None):
    if not salt:
        salt = make_salt()
    h = hashlib.sha256(email + pw + salt).hexdigest()
    return '%s,%s' % (h, salt)


def valid_pw(email, pw, h):
    salt = h.split(',')[1]
    return h == make_pw_hash(email, pw, salt)


class SignupHandler(MyHandler):
    def get(self, *args, **kwargs):
        self.render("register.html", notealer="")

    def post(self, *args, **kwargs):
        email = self.get_argument('email', '')
        password = self.get_argument('password', u'')
        repassword = self.get_argument('repassword', u'')
        username = self.get_argument('username', u'')
        # self.set_header('Content-Type', 'application/json')
        if email and password and username:
            db = self.db
            c = db.cursor()
            c.execute("select * from authentications where email=%s", email)
            e = c.fetchall()
            passwd = make_pw_hash(email, password)
            if not e:
                c.execute("insert into authentications(username,email,passwd) values (%s, %s, %s)",
                          (username, email, passwd))
                # self.redirect(self.request.path)
                # l = 'web'
                # self.redirect('%s#login-%s' % (self.request.path, l))
                self.redirect('/signin')
            else:
                note = "email is existed"
                self.render("register.html", notealer=note)
        else:
            self.redirect("/register")
            # login_email = self.get_argument('login-email', u'')
            # login_password = self.get_argument('login-password', u'')
            # c = db.cursor()
            # c.execute("select passwd from authentications where email=%s", login_email)
            # a = ''
            # a = c.fetchall()[0][0]
            # if a:
            #     if valid_pw(login_email, login_password, a):
            #         self.redirect("/bloglist")
            #     else:
            #         pwnote = "the password is wrong."
            # else:
            #     emailnote = "the email is wrong."
            # c.close()
            # db.commit()


class EditHandler(MyHandler):
    def get(self, id_num):
        c = self.db.cursor()
        c.execute("select title,article from dreams where id=%s", id_num)
        e = c.fetchone()
        edit_data = {}
        edit_data = {'title': e[0], 'article': e[1], 'id': id_num}
        print edit_data, "((((***))))"
        self.render("edit_blog.html", login_email_address=self.email_address, edit_data=edit_data)


class LogoutHandler(MyHandler):
    def get(self, *args, **kwargs):
        # emailnote=""
        self.render('login.html', emailnote="")


class LoginHandler(MyHandler):
    def get(self, *args, **kwargs):
    # if self.is_logined:
    #     self.redirect('/bloglist')
    #     return
    # t={"emailnot":"","pwnote":""}
        if self.get_current_user():
            self.redirect('/bloglist')
        self.render('login.html', emailnote="")

    def post(self, *args, **kwargs):
        # email = self.get_argument('email', '')
        # password = self.get_argument('password', u'')
        # username = self.get_argument('username', u'')
        # self.set_header('Content-Type', 'application/json')
        db = self.db
        # c = db.cursor()
        # c.execute("select * from authentications where email=%s", email)
        # e = c.fetchall()
        # passwd = make_pw_hash(email, password)
        # if not e:
        #     c.execute("insert into authentications(username,email,passwd) values (%s, %s, %s)",
        #               (username, email, passwd))
        #     self.redirect(self.request.path)
        #     # l = 'web'
        #     # self.redirect('%s#login-%s' % (self.request.path, l))
        # else:
        #     note = "the email has already existed"
        #     # self.render("login.html", note=note)

        login_email = self.get_argument('login-email', u'')
        login_password = self.get_argument('login-password', u'')
        if login_email and login_password:
            c = db.cursor()
            c.execute("select id, passwd from authentications where email=%s", login_email)
            user = c.fetchone()
            if user:
                userid, passwd = user
                if valid_pw(login_email, login_password, passwd):
                    self.set_user_data('userid', userid)
                    login_email_address = self.email_address
                    print login_email_address
                    if self.is_logined:
                        self.redirect('/bloglist')
                        # return
                        # self.render('write_blog.html', login_email_address=self.email_address)
                else:
                    pwnote = "the password is wrong."
                    # self.render('login.html', pwnote=pwnote)
            else:
                emailnote = "the email is wrong."
                self.render('login.html', emailnote=emailnote)
                # self.redirect('/s/login.html')
            c.close()
        else:
            self.redirect('/login')

            # db.commit()


            # def get(self, *args, **kwargs):
            # login_email = self.get_argument('login-email', u'')
            # login_email_split = login_email.split('@')[0]
            # print login_email, '+++++++---------'
            # cookie_hash = make_secure_val(login_email)
            # print cookie_hash
            # if not self.get_secure_cookie(name='visit'):
            #     self.set_secure_cookie(name='visit', value=cookie_hash)
            # else:
            #     self.set_secure_cookie(self.get_secure_cookie('visit'))
            # self.redirect('/s/write_blog.html')


# settings = {
#     "cookie_secret": "uiaaitore28903j4ki4t5/uhij53qyfdh/jiuq54="
# }


# class TestHandler(MyHandler):
#     def get(self, *args, **kwargs):
#         self.write('ok')
#         self.get_current_user()

class MyStaticHandler(tornado.web.StaticFileHandler, MyHandler):
    pass


application = tornado.web.Application([
                                          # (r"/test", TestHandler),
                                          (r"/create", CreateHandler),
                                          (r"/save/(.*)", SaveHandler),
                                          (r"/edit/(.*)", EditHandler),
                                          (r'/blog/(.*)', BlogHandler),
                                          (r'/commentpart', CommentHandler),
                                          (r"/bloglist", ShowHandler),
                                          (r"/bloglist/(.*)", ShowHandler),
                                          # (r"/delete/(.*)/(.*)", DeleteHandler),
                                          (r"/", LoginHandler),
                                          (r"/register", SignupHandler),
                                          (r"/signup", SignupHandler),
                                          (r"/signin", LoginHandler),
                                          (r"/exit", LogoutHandler),
                                          (r"/s/(.*)", MyStaticHandler,
                                           {"path": "/home/nancy/exercise/html_css_together/my_blog/"})
                                      ], debug=True)

if __name__ == "__main__":
    application.listen(8080)
    tornado.ioloop.IOLoop.instance().start()