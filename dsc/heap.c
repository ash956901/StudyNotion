#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 100

int heap[MAX];

void insert(int *n,int val){
  int i;
  if((*n)>=MAX){
    printf("HEAP FULL");
    return;
  }
  i=++(*n);
  while(i>1&&val>heap[i/2]){
    heap[i]=heap[i/2];
    i/=2;
  }
  heap[i]=val;
}

int delete(int *n){
  int parent=1,child=2;
  int temp=heap[(*n)--];
  int element=heap[1];
  while(child<=(*n)){
    if(child<(*n)&&heap[child]<heap[child+1]){
      child++;
    }
    if(temp>=heap[child]){
      break;
    }
    heap[parent]=heap[child];
    parent=child;
    child=child*2;
  }
  heap[parent]=temp;
  return element;
}


void display(int n){
  for(int i=1;i<=n;i++){
    printf("%d\t",heap[i]);
  }
}

int main(){
  int n=0;
  int flag;
  int ch;
  int element;
  while(flag){
    printf("Enter choice:\n1.Add element\n2.Remove element\n3.Display\n4.Exit\n");
    scanf("%d",&ch);
    switch(ch){
      case 1:
        printf("Enter element you want to insert into the heap:\n");
        scanf("%d",&element);
        insert(&n,element);
        break;
      case 2:
        printf("Deleted element:%d",delete(&n));
        break;
      case 3:
        display(n);
        break;
      case 4:
        flag=0;
        break;
    }
  }


  return 0;
}
