#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 100

int nfind(char *s,char* pat){
  int start=0;
  int endmatch;
  int lastp=strlen(pat)-1;
  int lasts=strlen(s)-1;
  int i,j;
  endmatch=lastp;
  for(i=0;endmatch<=lasts;endmatch++,start++){
    if(s[endmatch]==pat[lastp]){
      for(j=0,i=start;j<lastp&&s[i]==pat[j];i++,j++);
      if(j==lastp){
        return start;
      }
    }
  }

  return -1;
}

void make_failure(char *pat,int* failure){
  int i,j;
  failure[0]=-1;
  int n=strlen(pat);
  for(j=1;j<n;j++){
    i=failure[j-1];
    while(pat[j]!=pat[i+1]&&i>=0){
      i=failure[i];
    }
    if(pat[j]==pat[i+1]){
      failure[j]=i+1;
    }
    else{
      failure[j]=-1;
    }
  }
}


int pmatch(char *s,char *pat,int* failure){
  int lens=strlen(s);
  int lenp=strlen(pat);
  int i=0,j=0;
  while(i<lens&&j<lenp){
    if(s[i]==pat[j]){
      i++;
      j++;

    }
    else if(j==0){
      i++;
    }
    else{
      j=failure[j-1]+1;
    }

  }

   return (j==lenp)?(i-lenp):-1;
}


int main(){
  char s[MAX];
  char pat[MAX];
  int failure[MAX];

  printf("Enter the string:");
  scanf("%s",&s);

  printf("Enter the pattern:");
  scanf("%s",&pat);

  printf("NFIND:%d",nfind(s,pat));

  make_failure(pat,failure);

  printf("KMP:%d",pmatch(s,pat,failure));

  return 0;
}