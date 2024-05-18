#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#define MAX 100

typedef struct node* nodePointer;
typedef struct node{
        int data;
        nodePointer link;
}node;

nodePointer Graph[MAX]={NULL};
int visited[MAX]={0};


//add edge for graph
void add_edge(int vi,int vj){
  if(vi>=MAX||vj>=MAX){
    printf("INVALID EDGE");
    return;
  }
  nodePointer temp=(nodePointer)malloc(sizeof(node));
  temp->data=vj;
  temp->link=Graph[vi];
  Graph[vi]=temp;
}
//dfs
void dfs(int i){
  visited[i]=1;
  printf("%d\t",i);
  nodePointer temp=Graph[i];
  for(;temp;temp=temp->link){
    if(visited[temp->data]==0){
      dfs(temp->data);
    }
  }
}


//queue for bfs
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
  temp->link=NULL;
  if(q->front){
    q->rear->link=temp;
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
    q->front=q->front->link;
    return ret;
  }
}

bool is_empty(queue* q){
  return (q->front==NULL);
}
void displayQueue(queue* q){
  nodePointer temp=q->front;
  while(temp!=q->rear->link){
    printf("%d\t",temp->data);
    temp=temp->link;
  }
}
//bfs
void bfs(int i){
  insert(&q,i);
  visited[i]=1;
  while(!is_empty(&q)){
    int t=delete(&q);
    printf("%d\t",t);
    visited[t]=1;
    for(nodePointer temp=Graph[t];temp;temp=temp->link){
      if(visited[temp->data]==0){
        visited[temp->data]=1;
        insert(&q,temp->data);
      }
    }
  }
}





//main
int main(){
 
  q.front=NULL;
  q.rear=NULL;
  int flag=1;
  int ch;
  int limit;
  int n1,n2;
  printf("Enter the number of nodes:");
  scanf("%d",&limit);
  while(flag){
    printf("Enter the choice:\n1.ADD edge\n2.DFS\n3.BFS\n4.EXIT\n");
    scanf("%d",&ch);
    switch(ch){
      case 1:
        printf("Enter the edge to insert in graph:\n");
        scanf("%d %d",&n1,&n2);
        add_edge(n1,n2);
        break;
      case 2:
        printf("DFS:\n");
        for(int i=0;i<limit;i++){
          if(visited[i]==0){
            dfs(i);
          }
        }
        for(int i=0;i<limit;i++){
          visited[i]=0;
        }
        break;
      case 3:
        printf("BFS:\n");
        for(int i=0;i<limit;i++){
          if(visited[i]==0){
            bfs(i);
          }
        }
        for(int i=0;i<limit;i++){
          visited[i]=0;
        }

        break;
      case 4:
        flag=0;
        break;
    }
  }
  return 0;
}