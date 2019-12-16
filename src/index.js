import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { Button } from 'antd'
import * as serviceWorker from './serviceWorker';
// import { func } from 'prop-types';
/*
state 和 props 主要的区别在于 props 是不可变的，而 state 可以根据与用户交互来改变。
这就是为什么有些容器组件需要定义 state 来更新和修改数据。而子组件只能通过 props 来传递数据。
通过组件类的 defaultProps 属性为 props 设置默认值
HelloMessage.defaultProps = {
  name: 'Runoob'
};
*/
// function Clock(props){
//     return( 
//     <div>
//         <h1>Hello,world!{props.name}</h1>
//         <h2>It is {props.date.toLocaleTimeString()}</h2>
//     </div>
//     );
// }
function Dateformat(props){
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state={date:new Date()};
    }
    tick(){
        this.setState({
            date:new Date()
        });
    }
    //组件已经被渲染到 DOM 中后运行,在React 中被称为“挂载（mount）”
    /*()=>this.tick() 是 ES6 中声明函数的一种方式，叫做箭头函数表达式，
    引入箭头函数有两个方面的作用：更简短的函数并且不绑定 this
    var f = ([参数]) => 表达式（单一）
    // 等价于以下写法
    var f = function([参数]){
        return 表达式;
    }
    this.tick() 中的 this 指代的是 function，而不是我们想要的指代所在的组件类 Clock
    */
    componentDidMount(){
        this.timeId=setInterval(
            ()=>this.tick(),1000
        )
    }
    //一旦 Clock 组件从 DOM 中被移除,React 就会调用 componentWillUnmount() 生命周期方法
    //在React 中被称为“挂载（unmount）”
    componentWillUnmount(){
        clearInterval(this.timeId);
    }
    /*
    数据自顶向下流动
    父组件或子组件都不能知道某个组件是有状态还是无状态，
    并且它们不应该关心某组件是被定义为一个函数还是一个类,
    这就是为什么状态通常被称为局部或封装,
    以下实例中 FormattedDate 组件将在其属性中接收到 date 值，并且不知道它是来自 Clock 状态、
    还是来自 Clock 的属性、亦或手工输入
    */
    render(){
        return(
            <div>
                <h1>Hello,world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
                <Dateformat date={this.state.date}/>
            </div> 
        );
    }
}
// function trying(){
//     var element=document.getElementById('root');
//     element.style.color=element.style.color ==='red'?'blue':'red';
    
// }
//JSX 回调函数中的 this，类的方法默认是不会绑定 this 的
class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state={istoggle:true}
        /*1使用bind绑定this
        this.handleClick=this.handleClick.bind(this)
        */
        this.handleClick=this.handleClick.bind(this)
        
    }
    /*2使用属性初始化器(class fields)来正确的绑定回调函数：
    handleClick=()=>{}
    */
    handleClick(){
        this.setState(
            // prevState=>({istoggle:!prevState.istoggle})
            function(prevState){
                return {istoggle:!prevState.istoggle}
            }
        );
    }
    render(){
        return(
        /*
        3回调函数中使用 箭头函数,
        此语法问题在于每次渲染 LoggingButton 时都会创建不同的回调函数
        onClick={(e)=>this.handleClick(e)
        */
        <button onClick={this.handleClick}>
            {this.state.istoggle ?'ON':'OFF'}
        </button>
        );
    }
}

class LoggingControl extends React.Component{
    constructor(props){
        super(props);
        this.Logginginclick=this.Logginginclick.bind(this);
        this.Loggingoutclick=this.Loggingoutclick.bind(this);
        this.state={istoggleon:false}
    }
    Logginginclick(){
        this.setState({
            istoggleon:true
        });
    }
    Loggingoutclick(){
        this.setState({
            istoggleon:false
        });
    }
    render(){
        const istoggleon=this.state.istoggleon;
        let button;
        if(istoggleon){
            button=<LoginButton onClick={this.Logginginclick}/>
        }else{
            button=<LogoutButton onClick={this.Loggingoutclick}/>
        }
        return(
            <div>
                <Greeting istoggleon={istoggleon}/>
                {button}
            </div>
        );
    }
}
function Login(props){
    return <h1>欢迎回来</h1>
}
function Logout(props){
    return <h1>请先登录</h1>
}
function LoginButton(props){
    return (<button onClick={props.onClick}>登录</button>)
}
function LogoutButton(props){
    return (<button onClick={props.onClick}>退出</button>)
}
function Greeting(props){
    const istoggleon=props.istoggleon;
    if(istoggleon){
        return <Login />;
    }else{
        return <Logout/>;
    }
}
function Listnumber(props){
    return <li>{props.value}</li>
}
function Numberlist(props){
    const numbers=props.numbers;
    const listnumbers=numbers.map((number)=>
    // <Listnumber key={number.toString} value={number}></Listnumber>
    <li key={number.toString}>{number}</li>
    );
    return <ul>{listnumbers}</ul>
}
const numbers=[1,2,3,4]
class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: 0};
        this.setNewNumber = this.setNewNumber.bind(this);
    }
    
    setNewNumber() {
      this.setState({data: this.state.data + 1})
    }
    render() {
        return (
           <div>
              <button onClick = {this.setNewNumber}>INCREMENT</button>
              <Content myNumber = {this.state.data}></Content>
           </div>
        );
      }
  }
  
  
  class Content extends React.Component {
    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
         console.log('Component DID MOUNT!')
    }
    componentWillReceiveProps(newProps) {
          console.log('Component WILL RECEIVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
          return true;
    }
    componentWillUpdate(nextProps, nextState) {
          console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
          console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
           console.log('Component WILL UNMOUNT!')
    }
   
      render() {
        return (
          <div>
            <h3>{this.props.myNumber}</h3>
          </div>
        );
      }
  }
class Contexts extends React.Component{
    constructor(props){
        super(props);
        this.state={value:'zyx'};
        this.changetext=this.changetext.bind(this);
        this.buttonclick=this.buttonclick.bind(this);
    }
    changetext(event){
        this.setState({value:event.target.value})
    }
    buttonclick(event){
        this.refs.inputtext.focus();
        alert("提交内容为："+this.state.value);
    }
    render(){
        const value=this.state.value;
        return(
            <div>
                <input type='text' value={value} onChange={this.changetext} ref='inputtext'/>
                <button onClick={this.buttonclick}>获取焦点</button>
                <h2>{value}</h2>
            </div>
        )
    }
}
ReactDOM.render(
    <div>
        {/* <App /> */}
        {/* <Clock /> */}
        {/* <LoggingControl/> */}
        {/* <Toggle/> */}
        {/* <Numberlist numbers={numbers}></Numberlist> */}
        {/* <Button /> */}
        {/* <Contexts/> */}
        <Button type="primary">Button</Button>
    </div>,
    document.getElementById('root')
);
// setInterval(trying,1000);
serviceWorker.unregister();
