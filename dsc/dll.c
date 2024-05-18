#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 100

typedef struct node* nodePointer;
typedef struct node{
  nodePointer left;
  nodePointer right;
  int data;
}node;

void insert(nodePointer node,nodePointer newNode){
  newNode->left=node;
  newNode->right=node->right;
  if(node->right!=NULL){
    node->right->left=newNode;
  }
  node->right=newNode;
}

void delete(nodePointer deleted){
  if(deleted->right!=NULL){
    deleted->right->left=deleted->left;
  }
  if(deleted->left!=NULL){
    deleted->left->right=deleted->right;
  }
  free(deleted);
}

void display(nodePointer header){
  nodePointer current=header->right;
  while(current!=NULL){
    printf("%d\t",current->data);
    current=current->right;
  }
}

int main(){
  nodePointer header=(nodePointer)malloc(sizeof(node));
  if(!header){
    printf("Memory cant be allocated");
    exit(EXIT_SUCCESS);
  }
  header->left=NULL;
  header->right=NULL;
  int flag=1;
  int ch;
  while(flag){
    printf("Enter your choice:\n1.Insert Element\n2.Delete element\n3.Display\n4.Exit\n");
    scanf("%d",&ch);
    switch(ch){
      case 1:
        printf("Enter the element you want to insert:\n");
        int element;
        scanf("%d",&element);
        nodePointer temp=(nodePointer)malloc(sizeof(node));
        temp->data=element;
        insert(header,temp);
        break;
      case 2:
        printf("Enter the element you want to delete:\n");
        scanf("%d",&element);
        nodePointer current=header->right;
        while(current!=NULL&&current->data!=element){
          current=current->right;
        }
        if(current==NULL){
          printf("Element not found in the list");
          break;
        }
        else{
          delete(current);
          break;
        }
        break;
      case 3:
        display(header);
        break;
      case 4:
        flag=0;
        break;
    }
  }
  return 0;
}