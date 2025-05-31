import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginsignupComponent } from './pages/loginsignup/loginsignup.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ComingsoonComponent } from './pages/comingsoon/comingsoon.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { CustomerfeedbackComponent } from './pages/customerfeedback/customerfeedback.component';
import { MyaccountComponent } from './pages/myaccount/myaccount.component';
import { OrdertrackingComponent } from './pages/ordertracking/ordertracking.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { MyaccountorderComponent } from './pages/myaccountorder/myaccountorder.component';
import { MyaccountaddressComponent } from './pages/myaccountaddress/myaccountaddress.component';
import { PaymentconfirmationComponent } from './pages/paymentconfirmation/paymentconfirmation.component';
import { PaymentfailureComponent } from './pages/paymentfailure/paymentfailure.component';
import { RegisterComponent } from './pages/register/register.component';
import { TermsofuseComponent } from './pages/termsofuse/termsofuse.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { SearchresultComponent } from './pages/searchresult/searchresult.component';
import { ProductaddComponent } from './components/admin_pages/productadd/productadd.component';

export const routes: Routes = [

{
  path:'',
  component:HomeComponent
},

{
  path:'login',
  component:LoginsignupComponent
},
{
  path:'shop',
  component:ShopComponent
},
{
  path:'comingsoon',
  component:ComingsoonComponent
},
{
  path:'contactus',
  component:ContactusComponent
},
{
  path:'product',
  component:ProductComponent
},
{
path:'cart',
component:CartComponent
},
{
  path:'forgetpassword',
  component:ForgetpasswordComponent
},
{
path:'customerfeedback',
component:CustomerfeedbackComponent
},

{
path:'comingsoon',
component:ComingsoonComponent
},
{
  path:'myaccount',
  component:MyaccountComponent
},
{
  path:'ordertracking',
  component:OrdertrackingComponent
},
{
  path:'customerfeedback',
  component:CustomerfeedbackComponent
},
{
  path:'faqs',
  component:FaqsComponent
},
{
  path:'myaccountorder',
  component:MyaccountorderComponent
},
{
path:'Myaccountaddress',
component:MyaccountaddressComponent
},
{
  path:'paymentconfirmation',
  component:PaymentconfirmationComponent
},
{
  path:'paymentfailure',
  component:PaymentfailureComponent
},
{
  path:'register',
  component:RegisterComponent
},
{
  path:'termofuse',
  component:TermsofuseComponent
},
{
  path:'wishlist',
  component:WishlistComponent
},
{
  path:'searchresult',
  component:SearchresultComponent
},{
  path:'add-product',
  component:ProductaddComponent
}
];
