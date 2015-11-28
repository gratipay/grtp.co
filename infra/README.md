##### grtp.co server setup

grtp.co is hosted on Digital Ocean servers (called
`droplets`). So you need to create `droplet` and login
through SSH to contibue. Then use root/sudo to **create
user `grtp`** with **home at `grtp.co`** and install
required packages - **nginx**, **git**.

    adduser grtp --home=/home/grtp.co --disabled-password
    apt-get install nginx git

**with new grtp user:**

1. git clone https://github.com/gratipay/grtp.co.git production
2. cd production
...

setup for automatic update on push:

3. cp infra/post-receive .git/hooks/
4. chmod +x .git/hooks/post-receive
