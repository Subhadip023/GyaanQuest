import{j as e,m as p,L as g,$ as f}from"./app-RGNBjGk6.js";import{T as i,I as n}from"./TextInput-B0CxPAbb.js";import{I as l}from"./InputLabel-CVWVDVgj.js";import{P as h}from"./PrimaryButton-BMNbfd_X.js";import{G as j}from"./GuestLayout-BQt1TAlp.js";import"./index-tFTEi0sI.js";function b({className:a="",...r}){return e.jsx("input",{...r,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+a})}function C({status:a,canResetPassword:r}){const{data:t,setData:m,post:d,processing:c,errors:o,reset:u}=p({email:"",password:"",remember:!1}),x=s=>{s.preventDefault(),d(route("login"),{onFinish:()=>u("password")})};return e.jsxs(j,{children:[e.jsx(g,{title:"Log in"}),a&&e.jsx("div",{className:"mb-4 text-sm font-medium text-green-600",children:a}),e.jsxs("form",{onSubmit:x,children:[e.jsxs("div",{children:[e.jsx(l,{htmlFor:"email",value:"Email"}),e.jsx(i,{id:"email",type:"email",name:"email",value:t.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,onChange:s=>m("email",s.target.value)}),e.jsx(n,{message:o.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(l,{htmlFor:"password",value:"Password"}),e.jsx(i,{id:"password",type:"password",name:"password",value:t.password,className:"mt-1 block w-full",autoComplete:"current-password",onChange:s=>m("password",s.target.value)}),e.jsx(n,{message:o.password,className:"mt-2"})]}),e.jsx("div",{className:"mt-4 block",children:e.jsxs("label",{className:"flex items-center",children:[e.jsx(b,{name:"remember",checked:t.remember,onChange:s=>m("remember",s.target.checked)}),e.jsx("span",{className:"ms-2 text-sm text-gray-600",children:"Remember me"})]})}),e.jsxs("div",{className:"mt-4 flex items-center justify-end",children:[r&&e.jsx(f,{href:route("password.request"),className:"rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",children:"Forgot your password?"}),e.jsx(h,{className:"ms-4",disabled:c,children:"Log in"})]})]})]})}export{C as default};
