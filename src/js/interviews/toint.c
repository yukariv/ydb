#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

/* return the nomeric number of '0', '1', ... '9' as integer. For anything else, returns -1
 * Implemented as a static array for preformance (vs memory)
 */
int myatoi(unsigned char c)
{
  static int _toint[] = {
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, 0, 1,
    2, 3, 4, 5, 6, 7, 8, 9, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1};
  return _toint[c];
}

/* return the integer value of a string number.
 * Ignore preceding WS. Any non number char ends the input
 * Support +/- as the first char before the number
 */
int str2int(char *str)
{
  int n;
  int num = 0;
  int neg = 1;

  while (isspace(*str))
    str++;

  if (*str == '-')
  {
    neg = -1;
    str++;
  }
  if (*str == '+')
    str++;

  while (*str) 
  {
    n = myatoi(*str);
    if (n < 0)
      break;
    num = num*10 + n;
    str++;
  }

  return num*neg;
}

/* Unittests */
static void myatoi_t(char c, int e)
{
  int rc = myatoi(c);
  if (rc != e)
  {
    printf("ERR myatoi('%c'<%02x>) returned %d expected: %d\n", c, (unsigned char)c, rc, e);
    exit(1);
  }
  printf("myatoi('%c'<%02x>): %d\n", c, (unsigned char)c, rc);
}

static void str2int_t(char *s, int e)
{
  int rc = str2int(s);
  if (rc != e)
  {
    printf("ERR str2in(\"%s\") returned %d expected: %d\n", s, rc, e);
    exit(1);
  }
  printf("str2in(\"%s\"): %d\n", s, rc);
}

static int ut(void)
{
  myatoi_t('0', 0);
  myatoi_t('1', 1);
  myatoi_t('9', 9);
  myatoi_t('a', -1);
  myatoi_t((char)0xff, -1);
  printf("myatoi OK\n");
  str2int_t("1234", 1234);
  str2int_t("+1234", 1234);
  str2int_t("-1234", -1234);
  str2int_t(" +1234", 1234);
  str2int_t(" + 1234", 0);
  str2int_t(" \t1234\n", 1234);
  printf("myatoi OK\n");

  return 0;
}

static int g_ut = 1;
int main(void)
{
  if (g_ut)
    return ut();
  
  return 0;
}
