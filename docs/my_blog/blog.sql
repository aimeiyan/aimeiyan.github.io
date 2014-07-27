DROP TABLE IF EXISTS dreams;

CREATE TABLE dreams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title varchar (128) not null,
    create_time timestamp not null default current_timestamp,
    article LONGTEXT not null
) CHARSET = utf8;

alter table dreams add column userid int unsigned not null;

CREATE TABLE comment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    blogid int,
    author varchar (128) not null,
    message LONGTEXT not null,
    create_time timestamp not null default current_timestamp
) CHARSET = utf8;

CREATE TABLE authentications (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `provider` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uid` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `access_token` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `secret` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `expires` int(12) DEFAULT '0',
  `refresh_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique` (`user_id`,`provider`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `default_authentications` (`id`, `provider`, `uid`, `access_token`, `secret`, `created_at`, `updated_at`, `user_id`, `expires`, `refresh_token`) VALUES
(10, 'twitter', '754569028', '897234097-FxwID1nybWTIMmZs1hngsaWwedsfsfx7uiwxMwfU4s', '7uc1vzBAL9rA8h38asdfasfasOzeJkyt1jU1Zj4c', 1344632332, NULL, 1, NULL, NULL);

CREATE TABLE authentications(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username varchar (128) not null,
    email varchar (128) not null,
    passwd varchar (128) not null,
    UNIQUE KEY `unique` (`username`,`email`)
)CHARSET = utf8;

insert into authentications(username,email,password) values('luoluo','657074944@qq.com','123456')