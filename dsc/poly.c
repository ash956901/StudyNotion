#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 100

typedef struct link{
  int pow;
  int coef;
  struct link* next;
}my_poly;

void my_show_poly(my_poly *);
void my_create_poly(my_poly **);
void my_add_poly(my_poly **,my_poly *,my_poly *);

void my_create_poly(my_poly** node){
  my_poly * temp;
  temp=(my_poly*)malloc(sizeof(my_poly));
  *node=temp;
  int flag;
  do{
    printf("Enter the coeffecient and power :\n");
    int pow,coef;
    scanf("%d %d",&coef,&pow);
    temp->pow=pow;
    temp->coef=coef;
    temp->next=NULL;
    printf("Want to enter more terms:(yes-1/no-0)\n");
    scanf("%d",&flag);
    if(flag){
      temp->next=(my_poly*)malloc(sizeof(my_poly));
      temp=temp->next;
      temp->next=NULL;
    }
  }while(flag);
}

void my_show_poly(my_poly *node){
  while(node!=NULL){
    printf("%dx^%d",node->coef,node->pow);
    node=node->next;
    if(node!=NULL){
      printf("+");
    }
  }
}


void my_add_poly(my_poly ** node,my_poly* a,my_poly* b){
  my_poly* temp;
  temp=(my_poly*)malloc(sizeof(my_poly));
  *node=temp;
  while(a&&b){
    if(a->pow>b->pow){
      temp->pow=a->pow;
      temp->coef=a->coef;
      a=a->next;
    }
    else if(b->pow>a->pow){
      temp->pow=b->pow;
      temp->coef=b->coef;
      b=b->next;
    }
    else{
      temp->pow=b->pow;
      temp->coef=b->coef+a->coef;
       a=a->next;
      b=b->next;
    }
    if(a&&b){
       temp->next=(my_poly*)malloc(sizeof(my_poly));
       temp=temp->next;
       temp->next=NULL;
    }
  }

  while(a||b){
      temp->next=(my_poly*)malloc(sizeof(my_poly));
      temp=temp->next;
      temp->next=NULL;
      if(a){
         temp->pow=a->pow;
         temp->coef=a->coef;
         a=a->next;
      }
      if(b){
          temp->pow=b->pow;
          temp->coef=b->coef;
          b=b->next;
      }
  }

}

int main(){
  my_poly *a;
  my_poly *b;
  my_poly *c;
  int flag;
  do{
    printf("First Polynomial:\n");
    my_create_poly(&a);
    my_show_poly(a);
    printf("Second Polynomial:\n");
    my_create_poly(&b);
    my_show_poly(b);
    printf("Adding Polynomial...\n");
    my_add_poly(&c,a,b);
    my_show_poly(c);
    printf("Wanna add more?(Y-1/N-0)");
    scanf("%d",&flag);
  }while(flag);
  return 0;
}