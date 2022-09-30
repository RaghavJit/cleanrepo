#include<iostream>
#include<cstdio>
using namespace std;
int main(){
    string ab1,ab2;
    cout<<"enter 1st word here"<<endl;
    cin>>ab1;
    cout<<"enter 2nd word here"<<endl;
    cin>>ab2;
    int count=0;
    for(int i=0;i<ab1.size();i++){
        for(int j=0;j<ab1.size();j++){
            if(ab1[i]==ab2[j]){
            count = count +1;
            ab2[j] = ' ';
            ab1[i] = ' ';
            }
        }
    }
    int c=0;
    c=ab1.size()-count;
    cout<<count;   
    return 0;
}