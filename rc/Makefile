# Empty first rule all, so nothing happens for just 'make'
all:

RC_SRC = bashrc gvimrc vimrc

TARGETS = $(RC_SRC:%=$(HOME)/.%)
install:
	@$(foreach s,$(RC_SRC),install -v $(PWD)/_$s  $(HOME)/.$s;)
