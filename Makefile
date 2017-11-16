# XXX yes, recusive old makefile. Sndlar holech yachef

SUBDIRS = rc src/js src/c
SUBDIRS := $(addprefix $(PWD)/,$(SUBDIRS))
all:
install:
	$(foreach d,$(SUBDIRS),cd $d && make install;)
