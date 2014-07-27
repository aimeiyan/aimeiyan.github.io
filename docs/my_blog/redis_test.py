__author__ = 'nancy'

import redis


def hex_dump(s):
    return ":".join("{0:x}".format(ord(c)) for c in s)


r = redis.Redis(host='localhost', port=6379)
r.set('mykey', 10)
print r.type('mykey')

resp = r.dump('mykey')
print hex_dump(resp )

