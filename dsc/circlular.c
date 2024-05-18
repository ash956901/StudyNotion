#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 100

int capacity=2;
int size=0;
int front=-1;
int rear=-1;
int *arr;

int is_empty(){
  return (size==0);
}

int is_full(){
  return (size==capacity);
}

void resizeQueue();

void insert(int val){
  if(is_full()){
    resizeQueue();
  }
  if(is_empty()){
    front=0;
    rear=0;
  }
  else{
    rear=(rear+1)%capacity;
  }
  arr[rear]=val;
  size++;
}

int delete(){
  if(is_empty()){
    printf("Cant delete, queue empty");
    exit(EXIT_FAILURE);
  }
  int temp=arr[front];
  if(front==rear){
    front=-1;
    rear=-1;
  }
  else{
    front=(front+1)%capacity;
  }
  size--;
  return temp;
}

void resizeQueue(){
  int newCapacity=capacity*2;
  int *newArray;
  newArray=(int *)malloc(newCapacity*sizeof(int));
  if(!newArray){
    printf("Memory cant be allocated");
    exit(EXIT_FAILURE);
  }

  int i=0;
  int j=front;
  for(i=0;i<size;i++){
    newArray[i]=arr[j];
    j=(j+1)%capacity;
  }

  free(arr);
  capacity=newCapacity;
  arr=newArray;
  front=0;
  rear=size-1;
}

void displayQueue(){

  while(front!=rear+1){
    printf("%d\t",arr[front]);
    front=(front+1)%capacity;
  }
}
int main(){
  
  arr=(int*)malloc(capacity*sizeof(int));
  int flag=1;
  while(flag){
    printf("Enter choice:\n1.Insert Element\n2.Delete Element\n3.Display\n4.Exit\n");
    int ch;
    scanf("%d",&ch);
    switch(ch){
      case 1:
        printf("Enter the element you want to insert:\n");
        int ele;
        scanf("%d",&ele);
        insert(ele);
        break;
      case 2:
        delete();
        break;
      case 3:
        displayQueue();
        break;
      case 4:
        flag=0;
        break;
    }

  }  
  return 0;

}