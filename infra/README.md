##### grtp.co server setup

grtp.co is hosted on Digital Ocean servers (called
`droplets`). So you need to create `droplet` and login
through SSH to continue.

The system-application layout is following:

    /etc/nginx/sites-enabled/grtp.co  - nginx config
    /home/grtp.co/production          - code checkout
                    .git/hooks/post-receive
                                      - auto-update script

Then use root/sudo to **create
user `grtp`** with **home at `grtp.co`** and install
required packages - **nginx**, **git**.

    adduser grtp --home=/home/grtp.co --disabled-password --gecos ""
    apt-get install nginx git
    
    # now log into grtp user
    su grtp

With new `grtp` user:

    cd ~
    git clone https://github.com/gratipay/grtp.co.git production
    cd production

setup automatic update on push:

    cp infra/post-receive .git/hooks/
    chmod +x .git/hooks/post-receive
