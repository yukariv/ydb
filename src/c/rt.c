#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

#define ERR(s) ({perror(s); exit(1);})
int main(int argc, char* argv[])
{
    if (setuid(0))
        ERR("failed setuid()");
    if (setgid(0))
	ERR("failed getgid()");
    argv++;
    execvp(argv[0], argv);
    perror(argv[0]);
    return 2;
}

