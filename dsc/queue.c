#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 100

typedef struct node* nodePointer;
typedef struct node{
  int data;
  nodePointer next;
}node;

typedef struct{
  nodePointer front;
  nodePointer rear;
}queue;


queue q;


void insert(queue *q,int val){
  nodePointer temp;
  temp=(nodePointer)malloc(sizeof(node));
  if(!temp){
    printf("Memory cant be allocated");
    exit(EXIT_FAILURE);
  }
  temp->data=val;
  temp->next=NULL;
  if(q->front){
    q->rear->next=temp;
  }
  else{
    q->front=temp;
  }
  q->rear=temp;
}

int delete(queue* q){
  if(q->front==NULL){
    printf("QUEUE EMPTY");
    exit(0);
  }
  else{
    int ret=q->front->data;
    q->front=q->front->next;
    return ret;
  }
}

void displayQueue(queue* q){
  nodePointer temp=q->front;
  while(temp!=q->rear->next){
    printf("%d\t",temp->data);
    temp=temp->next;
  }
}

int main(){
  q.front=NULL;
  q.rear=NULL;
  int flag;
  int ch;
  while(flag){
    printf("Enter choice:\n1.Insert Element\n2.Delete Element\n3.Display\n4.Exit\n");
    scanf("%d",&ch);
    switch(ch){
      case 1:
        printf("Enter the element you want to insert:\n");
        int element;
        scanf("%d",&element);
        insert(&q,element);
        break;
      case 2:
        printf("Deleted element is:%d\n",delete(&q));
        break;
      case 3:
        displayQueue(&q);
        break;
      case 4:
        flag=0;
        break;
    }
  }
  return 0;
}