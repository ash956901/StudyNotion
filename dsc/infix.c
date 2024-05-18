#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 100
int isp[]={0,19,12,12,13,13,13,0};
int icp[]={20,19,12,12,13,13,13,0};
typedef enum{lparen,rparen,plus,minus,times,divide,mod,eos,operand} precedence;
precedence stack[MAX];
int top=-1;
char EXPR[MAX];


void push(precedence token){
  if(top>=MAX){
    printf("STACK OVERFLOW");
    exit(EXIT_FAILURE);
  }
  stack[++top]=token;
}

precedence pop(){
  if(top==-1){
    printf("STACK UNDERFLOW");
    exit(EXIT_FAILURE);
  }
  return stack[top--];
}

precedence get_token(char *s,int *n){
  *s=EXPR[(*n)++];
  switch(*s){
    case '(':return lparen;
    case ')':return rparen;
    case '+':return plus;
    case '-':return minus;
    case '*':return times;
    case '/':return divide;
    case '%':return mod;
    case '\0':return eos;
    default: return operand;
  }
}

void print_token(precedence token){
  switch(token){
    case plus:printf("+"); break;
    case minus:printf("-"); break;
    case times:printf("*"); break;
    case divide:printf("/"); break;
    case mod:printf("%%"); break;
  }
}

void postfix(){
  stack[0]=eos;
  top=0;
  int n=0;
  char s;
  precedence token;
  for(token=get_token(&s,&n);token!=eos;token=get_token(&s,&n)){
    if(token==operand){
      printf("%c",s);
    }
    else if(token==rparen){
      while(stack[top]!=lparen){
        print_token(pop());
      }
      pop();
    }
    else{
      while(isp[stack[top]]>=icp[token]){
        print_token(pop());
      }
      push(token);
    }
  }

  while((token=pop())!=eos){
    print_token(token);
  }

}


int main(){
  printf("Enter the infix expression:");
  scanf("%s",&EXPR);
  postfix();
  return 0;
}
