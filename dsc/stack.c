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
  nodePointer top;
}stack;


stack s;


void push(stack *s,int val){
  nodePointer temp;
  temp=(nodePointer)malloc(sizeof(node));
  if(!temp){
    printf("Memory cant be allocated");
    exit(EXIT_FAILURE);
  }
  temp->data=val;
  if(s->top){
    temp->next=s->top;
  }
  else{
    temp->next=NULL;
  }
  s->top=temp;
}

int pop(stack* s){
  if(s->top==NULL){
    printf("STACK UNDERFLOW");
    exit(0);
  }
  else{
    int ret=s->top->data;
    s->top=s->top->next;
    return ret;
  }
}

void displayStack(stack* s){
  nodePointer temp=s->top;
  while(temp!=NULL){
    printf("%d\t",temp->data);
    temp=temp->next;
  }
}

int main(){
  s.top=NULL;
  int flag;
  int ch;
  while(flag){
    printf("Enter choice:\n1.Push Element\n2.Pop Element\n3.Display\n4.Exit\n");
    scanf("%d",&ch);
    switch(ch){
      case 1:
        printf("Enter the element you want to push into the stack:\n");
        int element;
        scanf("%d",&element);
        push(&s,element);
        break;
      case 2:
        printf("Deleted element is:%d\n",pop(&s));
        break;
      case 3:
        displayStack(&s);
        break;
      case 4:
        flag=0;
        break;
    }
  }
  return 0;
}