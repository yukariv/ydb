#!/bin/bash

APT_PKGS='make gcc gdb valgrind vim-gtk cscope ctags'
sudo apt-get update
sudo apt-get install $APT_PKGS
