import React,{Component} from 'react';
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../index.css'
import Axios from 'axios';
import Sidebar from './Sidebar'
import Tasklist from './Tasklist'
import TaskForm from './Taskform'
import SearchBox from './SearchBox'
import Addtask from './common/Addtask';
import Navbar from './common/Navbar';
import {Data} from './common/urls'

class Home extends Component {
  constructor(){
    super();
    this.scroll=false;
  }

  state={
    data:[],
    status:["In-Progress","Completed"],
    label:[],
    form:[],
    search:"",
    filter:{status:"",label:"",important:""}
  }

  async componentDidMount(){
    if(localStorage.jwt){
    const {data} = await Axios.post(Data,{jwt:localStorage.getItem('jwt')})
    const label=[...new Set(data.map((item)=>item.label))]
    this.setState({
      data,
      label,
    })
  }
  }


  handleFilterChange=(key,value)=>{
    let filter = {...this.state.filter}
    filter[key]=value
    this.setState({filter})
  }


  handleToggle=async(key,item,stateObj)=>{
    let arr=[...this.state[stateObj]]
    const index=arr.indexOf(item)
    arr[index][key]=!arr[index][key]
    if(stateObj==="data") await Axios.put(`${Data}/changes`,{data:arr,jwt:localStorage.getItem('jwt')})
    this.setState({
      [stateObj]:arr
    })
  }


  handleNewTask=async()=>{
    const Today = new Date()
    const length =this.state.form.length + 1
    const created={dd:Today.getDate(),mm:Today.getMonth()+1,yy:Today.getFullYear()}
    const form = [...this.state.form,{id:length,task:"",label:"",status:false,due:"",created,important:false,errors:{task:"",due:"",label:""}}]
    this.setState({
      form
    })
    this.scroll=true
  }


  handleNewTaskSubmit=async(e,item)=>{
    e.preventDefault()

    let form=[...this.state.form]
    const due=item.due.split("/")

    if(due.length!==3){
      const index = form.indexOf(item)
      form[index].errors.due="date Format dd/mm/yyyy"
      this.setState({
        form
      })
      return ;
    }

    form = form.filter((each)=>each!==item)

    const crctDate={
      dd:parseInt(due[0]),
      mm:parseInt(due[1]),
      yy:parseInt(due[2])
    }

    item.due=crctDate
    item.label = item.label.toLowerCase()
    delete item.id
    delete item.errors
    let label = [...this.state.label]
    if(!label.includes(item.label)) label.push(item.label)
    const {data} = await Axios.put(`${Data}/new`,{jwt:localStorage.getItem('jwt'),newData:item})
    this.setState({
      data:data,
      label:label,
      form:form
    })
  }


  handleNewTaskUpdate=(e,item)=>{
    const name = e.currentTarget.name
    let form = [...this.state.form]
    const index = form.indexOf(item)
    form[index][name]=e.currentTarget.value
    if(form[index][name]==="") form[index].errors[name]=`Please enter a valid ${name}`
    else delete form[index].errors[name]
    this.setState({
      form
    })
  }


  handleNewTaskDelete=(item)=>{
    const form = this.state.form.filter((each)=>each!==item)
    this.setState({
      form
    })
  }


  handleDeleteTask=async(item)=>{
    const data=[...this.state.data].filter((each)=>each!==item)
    const label=[...new Set(data.map((item)=>item.label))]
    const filter ={...this.state.filter}
    if(!label.includes(item.label)) filter['label'] = "";filter['important']="";filter['status']=""

    await Axios.put(`${Data}/changes`,{data,jwt:localStorage.getItem('jwt')})

    this.setState({
      data,
      label,
      filter
    })

  }


  handleSearchUpdate=(e)=>{
    const search = e.currentTarget.value
    this.setState({
      search
    })
  }


  render() {
    let {search,data,filter,label,status,form} = this.state
    data=data.filter((item)=>item.task.toLowerCase().indexOf(search.toLowerCase())===0)
    Object.keys(filter).forEach(key=>{
      if(filter[key]!=="" || filter[key]===true) data = data.filter((element)=>element[key]===filter[key])
    })
      if(localStorage.jwt){

        return(
          <React.Fragment>

          <Navbar history={this.props.history}/>

          <div className="container-fluid">
            {this.state.data.length + form.length >0 ?         
            <div className="row m-2 m-0 p-0">
              <div className="col-sm-3 m-0 p-1">

                <Sidebar label={label} 
                status={status} 
                filter={filter}
                handleFilterChange={this.handleFilterChange}/>

              </div>
              <div className="col-sm-9 m-0 p-1">

                <SearchBox 
                search={search} 
                history={this.history}
                important={filter.important}
                handleSearchUpdate={this.handleSearchUpdate}
                handleFilterChange={this.handleFilterChange}
                datalength={this.state.data.length}
                filterlength={data.length}
                />

                <Tasklist 
                stateDataLength={this.state.data.length}
                data={data} 
                handleToggle={this.handleToggle}
                handleDeleteTask={this.handleDeleteTask}/>

                <TaskForm 
                form={this.state.form} 
                handleNewTaskSubmit={this.handleNewTaskSubmit} 
                handleNewTaskDelete={this.handleNewTaskDelete}
                handleNewTaskUpdate={this.handleNewTaskUpdate}
                handleToggle={this.handleToggle}
                />

              </div>
            </div>
            :
            <div className="rounded p-3 m-5">
              <p className="text-center">Add some Tasks by clicking the Add button in the bottom right side</p>
            </div>
            }
            <Addtask handleNewTask={this.handleNewTask}/>
          </div>
          </React.Fragment>
        );
      }
      else{
        this.props.history.replace('/auth')
        return null;
      }
  }
  componentDidUpdate(){
    if(this.scroll) window.scrollTo(document.body.clientWidth,document.body.clientHeight);this.scroll=false
  }
}

export default Home;
