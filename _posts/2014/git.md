---
layout: post
title:  Git—源代码版本管理工具
---


###  1. git代码管理网站：

 * [https://github.com/](https://github.com/)
 * [https://bitbucket.org/](https://bitbucket.org/)
 * [https://about.gitlab.com/gitlab-com/](https://about.gitlab.com/gitlab-com/)

### 2. 在mac上安装git

```javascript
brew install git
```

### 3. gitignore文件

与.git在同一个目录，一般是项目的根目录。在该文件中记录要过滤文件路径即可。如：*/.DS_Store。

### 4. git文件路径中的config文件中的内容

```javascript
/*远端分支信息Start*/
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = true
        
[remote "origin"]
        url=ssh://yanaimei@gerrit.dev:10414/tbtadmin
        fetch = +refs/heads/*:refs/remotes/origin/*
        push = HEAD:refs/for/master

[remote "test"]
        url=ssh://yanaimei@gerrit.dev:10414/tbtadmin
        fetch = +refs/heads/*:refs/remotes/origin/*
        push = HEAD:refs/for/test

[remote "professional"]
        url=ssh://yanaimei@gerrit.dev:10414/tbtadmin
        fetch = +refs/heads/*:refs/remotes/origin/*
        push = HEAD:refs/for/professional
    /*远端分支信息End*/
```

```javascript
/*本地分支信息Start*/
/* 本地分支与远端分支绑定，本地相应分支在git pull和git push代码时，不必再指定分支，即简化$ git pull <远程主机名> < 远程分之名>： <本地分之名> 、$git pull --rebase <远程主机名> <远程分支名>:<本地分之名>*/
 [branch "master"]
        remote = origin
        merge = refs/heads/master

[branch "test"]
        remote = origin
        merge = refs/heads/test

[branch "professional"]
        remote = origin
merge = refs/heads/professional

/*本地分支信息End*/
```

git checkout –b <分之名> <远程名>／<分支名>  
git checkout -b test origin/test  
作用是checkout远程的test分支，在本地起名为test分支，并切换到本地的test分支。
### 5. 合并提交
### 6. 创建分支

```javascript
→ git branch -a
* master
  remotes/origin/master

→ git push origin master:production
Password for 'https://jindiNancy@bitbucket.org':
Total 0 (delta 0), reused 0 (delta 0)
remote:
remote: Create pull request for production:
remote:   https://bitbucket.org/jindiNancy/documents/pull-requests/new?source=production&t=1
remote:
To https://jindiNancy@bitbucket.org/jindiNancy/documents.git
 * [new branch]      master -> production

→ git push origin master:test
→ git branch test
→ git branch production
→ git branch -a
* master
  production
  test
  remotes/origin/master
  remotes/origin/production
  remotes/origin/test

```

### 7.临时修改时分支之间操作
代码经git工具管理，一般要创建3个分支：master、test和production，master分支一般使开发人员开发代码的分支，开发完毕后要合并到tese分支，test分支一般供测试人员使用，如果test上的代码没有问题，才会合并到production分支，production分支一般是最终封版的代码，是要部署上线的。

```javascript
→ git status
On branch test
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	Gitb.docx

nothing added to commit but untracked files present (use "git add" to track)

→ git add .
→ git commit -m "git update"
→ git log -2
a53d10c - feng, 3 seconds ago : git update
1e745f9 - feng, 19 minutes ago : git doc write
→ git push origin test:test

→ git checkout master
→ git log -2
d15244a - feng, 20 minutes ago : git doc write
9fc3687 - yanaimei, 6 days ago : modify git

→ git cherry-pick a53d10c
[master 67e9624] git update
 Date: Wed Aug 19 19:15:17 2015 +0800
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 Gitb.docx

→ git log -3
67e9624 - feng, 62 seconds ago : git update
d15244a - feng, 20 minutes ago : git doc write
9fc3687 - yanaimei, 6 days ago : modify git
```

### 8. 向线上分支提交成熟代码
当test分支的代码测试完成之后，可以向production的分支提价最后成熟的代码  
```javascript
→ git checkout test
→ git log -3
fd4e6a7 - feng, 5 minutes ago : git
a53d10c - feng, 18 minutes ago : git update
1e745f9 - feng, 37 minutes ago : git doc write

→ git checkout production
→ git log -2
9fc3687 - yanaimei, 6 days ago : modify git
7c63c4a - yanaimei, 6 days ago : modify git.docx

→ git merge origin/test
Updating 9fc3687..fd4e6a7
Fast-forward
 .gitignore                                                                                                                           |   1 +
 Git.docx                                                                                                                             | Bin 88821 -> 83532 bytes
 Gitb.docx                                                                                                                            | Bin 0 -> 83701 bytes
 ...224\346\272\220\344\273\243\347\240\201\347\211\210\346\234\254\347\256\241\347\220\206\345\267\245\345\205\267\343\200\202.docx" | Bin 0 -> 83244 bytes
 4 files changed, 1 insertion(+)
 create mode 100644 .gitignore
 create mode 100644 Gitb.docx
 create mode 100644 "Git\342\200\224\342\200\224\346\272\220\344\273\243\347\240\201\347\211\210\346\234\254\347\256\241\347\220\206\345\267\245\345\205\267\343\200\202.docx"

→ git log
fd4e6a7 - feng, 7 minutes ago : git
a53d10c - feng, 20 minutes ago : git update
1e745f9 - feng, 39 minutes ago : git doc write
9fc3687 - yanaimei, 6 days ago : modify git
7c63c4a - yanaimei, 6 days ago : modify git.docx
→ git status
On branch production
→ git push origin production:production
```

### 9.常用命令汇总
git pull –rebase origin master  
git push origin xiaoming:master
git rebase –continue   
git reset --soft HEAD^1 去掉最近的commit  
git push -help

add  
添加新文件到 Git 代码仓库的索引中   
$ git add filename  


mv  
移动或重命名文件  
$ git mv old-filename new-filename

rm  
从工作目录和 Git 代码索引中删除文件  
$ git rm filename

status  
查看目前工作目录的代码状态，自上次提交以来的添加、修改和删除等  
$ git status

diff  
查看自上次提交以来，本地代码改动的具体情况  
$ git diff

commit  
提交修改的代码（只是提交到本地的代码库，不会推送到服务器）  
$ git commit -am '修改说明'  
如果觉得刚提交的“修改说明”写得不够好，可输入以下命令调整       
$ git commit –amend

push  
将自上次 push 以来的，本地历次 commit，推送到服务器   
结合我们的实际，应该这样写：  
$ git push origin master:your-id  
其中，master 是本地的分支名；your-id 填你在服务器上的 id，服务器的版本库里会有以你的 id 为名称的分支。

pull  
将别人推送到服务器的代码，拉到你的机器里  
$ git pull

log  
查看修改记录，含作者、时间、修改说明等  
$ git log

show  
显示具体的代码改动情况  
显示最后一次 commit 修改的内容：  
$ git show  
显示指定 commit 修改的内容：  
【TIP】git log 命令中，每条 commit 会有一长长的字符串，此即 commid id，取其前面五六位即可。  
$ git show commit-id

branch
分支管理
列出所有分支（当前所在分支前会有“*”号）：
$ git branch
新建分支：
$ git branch 新分支名
删除分支：
$ git branch -d 欲删除的分支名
【注意！】不要把 ‘-d’ 写成了 ‘-D’，危险！
1.	-d：要求：被删除分支的所有修改，已经合并到当前分支；
2.	-D：直接删除，未合并的代码，将被丢弃！

checkout  
恢复某个已修改的文件（撤销未提交的修改）：  
$ git checkout file-name  
切换到另外的分支，进行开发：  
$ git checkout branch-name  
【注意！】该命令可能伴随大量的文件增删/修改。Windows 下，改动已被占用的文件可能会被拒绝，导致版本库出现严重问题。如果确实要这样做，安全起见，最好先注销一次。

merge  
合并指定分支到当前分支：  
$ git merge branch-name

revert  
还原已提交的修改（已经提交过的修改，可以反悔～）  
还原最近一次提交的修改：  
$ git revert HEAD  
还原指定版本的修改：  
$ git revert commit-id

stash  
先将未提交的修改暂存起来，接着清除所有改动，使之与没修改时一样。  
若你正在开发功能 A，又需立即去开发功能 B。A 的代码正改到一半，未认真整理，你不想立即提交。此时……请呼叫 stash ～。  
它会使你所有未提交的修改瞬间不见了：  
$ git stash  
它会使刚刚不见了的修改，瞬间又回来了：  
$ git stash pop  
【TIP】以上命令皆有更多参数，另有一些 Git 命令我们此处没有介绍。但是，这已足令你使用 Git 时游刃有余，你会觉得，Git 简直是一件神器！:-)  
【TIP】’$ git help’ 与 ‘$ git help 命令名’ 会在你需要的时候，无私地帮助你。:-)

附：git push 失败的解决办法   
假设执行操作：
1. 修改代码  
2. git commit
3. git push
此时 push 失败（错误提示：! [rejected] master -> master (non-fast-forward) ）  
解决办法：  
$ git pull  
若成功，则：  
$ git push origin master:your-id  
完事。  
若失败（提示：CONFLICT (content): Merge conflict in 文件名），则：  
冲突的文件会有类似下面的代码块：  
<<<<HEAD 你修改的代码  
 ============   
其他人修改的代码 >>>>>commit id of others'  

考虑你和他人对代码的修改，更新成合适的内容，并删除 <<<、===、>>> 3行标记符号，保存文件。  
$ git commit -am "resolve conflict" $ git push origin master:your-id 


### 10.参考网站
* [http://git-scm.com/book/zh/v1](http://git-scm.com/book/zh/v1) 
* [http://www.chengxufan.com/site/19;](http://www.chengxufan.com/site/19)