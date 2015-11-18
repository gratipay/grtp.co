##### grtp.co server setup

with root:

1. create user `grtp` with `grtp.co` home
2. install nginx git

with new grtp user;

1. git clone https://github.com/gratipay/grtp.co.git production
2. cd production
...

# setup automatic update
3. cp infra/post-receive .git/hooks/
4. chmod +x .git/hooks/post-receive
