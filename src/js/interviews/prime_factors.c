#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

/* return a static string with the prime factors of num ',' seporated.
 * Note: No chack for buffer overflow in return
 */
char *prime_factors(int num)
{
  int i = 2, e = sqrt((double)num)+1;
  int f = 0;
  static char buf[4096];
  buf[0] = 0;
  while (i < e)
  {
    if (num%i)
    {
      i++;
      continue;
    }
    sprintf(buf+strlen(buf), "%s%d", f?",":"", i);
    num = num/i;
    f++;
  }
  if (!f)
    sprintf(buf+strlen(buf), "%d", num);
  return buf;
}

static void prime_factors_t(int n, char *e)
{
  char *rc = prime_factors(n);
  if (!rc || strcmp(rc, e))
  {
    printf("ERR: prime_factors(%d): \"%s\" exp: \"%s\"\n", n, rc, e);
    exit(1);
  }
  printf("prime_factors(%d): \"%s\"\n", n, rc);
}

int main(void)
{
  prime_factors_t(60, "2,2,3,5");
  prime_factors_t(17, "17");
  prime_factors_t(1, "1");
  prime_factors_t(81, "3,3,3,3");
  prime_factors_t(49, "7,7");
  return 0;
}
