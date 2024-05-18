#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 100

typedef struct{
  int row;
  int col;
  int val;
}term;

term a[MAX];
term b[MAX];
term c[MAX];

void simple_transpose(term a[],term b[]){
  int n=a[0].val;
  b[0].row=a[0].col;
  b[0].col=a[0].row;
  if(n>0){
    int currb=1;
    for(int i=0;i<a[0].col;i++){
      for(int j=1;j<=a[0].val;j++){
        if(a[j].col==i){
          b[currb].val=a[j].val;
          b[currb].row=a[j].col;
          b[currb].col=a[j].row;
          currb++;
        }
      }
    }
  }
}


void fast_transpose(term a[],term b[]){
  int n=a[0].val;
  b[0].row=a[0].col;
  b[0].col=a[0].row;
  int row_term[a[0].col];
  int start_posn[a[0].col];
  if(n>0){
    for(int i=0;i<a[0].col;i++){
      row_term[i]=0;
    }
    for(int i=1;i<=n;i++){
      row_term[a[i].col]++;
    }
    start_posn[0]=1;
    for(int i=1;i<a[0].col;i++){
      start_posn[i]=start_posn[i-1]+row_term[i-1];
    }
    for(int i=1;i<=n;i++){
      int j=start_posn[a[i].col]++;
      b[j].row=a[i].col;
      b[j].col=a[i].row;
      b[j].val=a[i].val;
    }

  }
}


int main(){
  
  printf("Enter the number of rows,columns,values:\n");
  scanf("%d %d %d",&a[0].row,&a[0].col,&a[0].val);

  printf("Enter the row,col,value:\n");
  for(int i=1;i<=a[0].val;i++){
      scanf("%d %d %d",&a[i].row,&a[i].col,&a[i].val);
  }


  printf("Printing the matrix:\n");
  for(int i=1;i<=a[0].val;i++){
      printf("%d %d %d \n",a[i].row,a[i].col,a[i].val);
  }


  simple_transpose(a,b);
  printf("Simple transpose:\n");
  for(int i=1;i<=a[0].val;i++){
      printf("%d %d %d \n",b[i].row,b[i].col,b[i].val);
  }


  fast_transpose(a,c);
  printf("Fast transpose:\n");
  for(int i=1;i<=a[0].val;i++){
      printf("%d %d %d \n",c[i].row,c[i].col,c[i].val);
  }
  return 0;
}