#!/bin/sh

set -e

curl https://raw.githubusercontent.com/jamesottaway/tmux-up/master/tmux-up > /usr/local/bin/tmux-up
chmod u+x /usr/local/bin/tmux-up
