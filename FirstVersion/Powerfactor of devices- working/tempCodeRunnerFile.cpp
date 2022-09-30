#include <iostream>

using namespace std;

int arr1[10], arr2[10];

int to_list(int a, int* arr){
    int i = 0;

    while(a != 0){
        arr[i] = a%10;
        a = a/10;

        i=i+1;
    }

    return i;
}

int main(){
    int a, b, n = 0;

    cin>>a;
    cin>>b;
    
    int lena = to_list(a, arr1);
    int lenb = to_list(b, arr2);

    if(lena == lenb){

        for(int i=0; i<lena; i++){
            for(int j=0; j<lenb; j++){

                if(arr1[i]==arr2[j]){
                    n=n+1;
                }
            }
        }

        if(n == lena){
            cout<<"YES";
        }
        else{
            cout<<n;
        }
    }

    return 0;
}