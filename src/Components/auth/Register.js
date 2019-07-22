import React, { Component } from 'react';
import axios from 'axios';
import { message } from 'antd'
import port from '../../port';
import { Link , NavLink} from 'react-router-dom'

export default class Register extends Component {


    state = {
        cname: '', gst: '', email: '', password: '', repass: '', phone: '',
        address: '', area: '', city: '', pincode: '', doc: '', docUploaded: false
    }


    hadnleSubmit = async (e) => {
        e.preventDefault()
        const { cname, gst, email, password, repass, phone,
            address, area, city, pincode, doc } = this.state

        console.log(this.state)
        
       
       axios.post(`/registerCompany?name=${cname}&gst_no=${gst}&email=${email}&password=${password}&phoneno=${phone}&address=${address}&area=${area}&city=${city}&pincode=${pincode}`,{   
        }).then(res=>{
        // let res = {
        //     data: {details:{'address': "Barathi Colony",
        //     'area': "Thiruva6nmayur",
        //     'city': "Chennau",
        //     'email': "danyrupes@gmail.com",
        //     'gst_no': "GST211",
        //     'is_active': 1,
        //     'is_verify': 0,
        //     'name': "DanyTest2",
        //     'password': "$2b$08$S3VwBWrvK7nDbKxI2RKNN.CyzUkiqLy0myktCryPQNd5OqLXi//Xe",
        //     'phoneno': "6381729308",
        //     'pincode': 600041,
        //     '_id': "5ce3acb5c683556d6a70819e"}}
        // }
        let data = res.data.details
        let {_id} =data
        console.log(_id, email)
            localStorage.setItem('Wdm_sid', _id)
            localStorage.setItem('Wdm_scc',email)
            this.props.history.push('/package/'+_id)
        }).catch(err=>console.log(err))

        // if(reg){
        // }
    }

    handleDocUpload = (e) => {
        e.preventDefault()
        this.setState({ docUploaded: false })
        const { name, type } = e.target.files[0]
        const file = e.target.files[0]
        //axios post doc to s3 and get url and store url to doc:''
        // this.setState({doc:e.target.files[0]})

        const formData = new FormData();
        formData.append('file', file);

        const options = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        };

        // console.log(formData.get('file'))
        //   fetch(port+'/api/customer/orders/upload_image/test', options)
        //     .then(res => res.json())
        //     .then(out => this.setState({ Avatar_uri: out.json().url }))
        //     .catch(err => console.log(err))
        message.success('File Uploaded Successfully')
        // message.error('Cannot Upload File')
        // message.info('Try Some Other Format')
        this.setState({ docUploaded: true })

    }

    render() {
        return (
            <div id="app">
                <section className="section">
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
                                <div className="login-brand">
                                    <img src="../dist/img/wefactor_logo.png" alt="logo" width="100" className="shadow-light rounded-circle" />
                                </div>

                                <div className="card card-primary">
                                    <div className="card-header"><h4>Register</h4></div>

                                    <div className="card-body">
                                        <form >
                                            <div className="row">
                                                <div className="form-group col-6">
                                                    <label for="frist_name">Company Name </label>
                                                    <input id="frist_name" type="text" className="form-control"
                                                        name="frist_name" autofocus
                                                        value={this.state.cname}
                                                        onChange={(e) => this.setState({ cname: e.target.value })} />
                                                </div>
                                                <div className="form-group col-6">
                                                    <label for="last_name">GST No </label>
                                                    <input id="last_name" type="text" className="form-control"
                                                        name="last_name"
                                                        value={this.state.gst}
                                                        onChange={(e) => this.setState({ gst: e.target.value })} />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label for="email">Email</label>
                                                <input id="email" type="email" className="form-control" name="email"
                                                    value={this.state.email}
                                                    onChange={(e) => this.setState({ email: e.target.value })} />
                                                <div className="invalid-feedback">
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="form-group col-6">
                                                    <label for="password" className="d-block">Password</label>
                                                    <input id="password" type="password"
                                                        className="form-control pwstrength" data-indicator="pwindicator" name="password"
                                                        value={this.state.password}
                                                        onChange={(e) => this.setState({ password: e.target.value })} />
                                                    <div id="pwindicator" className="pwindicator">
                                                        <div className="bar"></div>
                                                        <div className="label"></div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-6">
                                                    <label for="password2" className="d-block">Repeat Password</label>
                                                    <input id="password2" type="password" className="form-control" 
                                                    name="password-confirm" 
                                                    value={this.state.repass}
                                  onChange={(e)=>this.setState({repass:e.target.value})}/>
                                                </div>
                                                <div className="form-group col-6">
                                                    <label for="password2" className="d-block">Phone No</label>
                                                    <input id="password2" type="number" className="form-control"
                                                     name="password-confirm" 
                                                     value={this.state.phone}
                                  onChange={(e)=>this.setState({phone:e.target.value})}/>
                                                </div>
                                                <div className="form-group col-6">
                                                    <label>City</label>
                                                    <input type="text" className="form-control" 
                                                    value={this.state.city}
                                
                                                    onChange={(e)=>this.setState({city:e.target.value})}/>
                                                </div>

                                            </div>

                                            <div className="form-group ">
                                                    <label for="password2" className="d-block">Address</label>
                                                    <input id="password2" type="text" className="form-control "
                                                     name="password-confirm"
                                                     value={this.state.address}
                                                     onChange={(e)=>this.setState({address:e.target.value})} />
                                            </div>

                                            <div className="row">
                                                <div className="form-group col-6">
                                                    <label>Area</label>
                                                    <input type="text" className="form-control" 
                                                    value={this.state.area}
                                
                                                    onChange={(e)=>this.setState({area:e.target.value})}/>
                                                </div>

                                                <div className="form-group col-6">
                                                    <label>Postal Code</label>
                                                    <input type="text" className="form-control"
                                                    value={this.state.pincode}
                                                    onChange={(e)=>this.setState({pincode:e.target.value})} />
                                                </div>
                                                <div className="form-group col-6">
                                                <label> Upload Documents</label><pre></pre>
                                                    <input type="file" 
                                onChange={(e)=>this.handleDocUpload(e)}/> 
                                <small className="form-text text-muted">Upload the necessary documents</small>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" name="agree" className="custom-control-input" id="agree" />
                                                    <label className="custom-control-label" for="agree">I agree with the terms and conditions</label>
                                                </div>
                                            </div>



                                            <div className="form-group">
                                                <button 
                                                disabled={this.state.password==this.state.repass && this.state.cname && this.state.gst
                                                && this.state.email && this.state.address && this.state.city && this.state.phone &&
                                                this.state.pincode && this.state.docUploaded?false:true }
                                                onClick={this.hadnleSubmit}
                              className="btn btn-primary btn-lg btn-block">
                                                    Register
                    </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="simple-footer">
                                    Copyright &copy; Lubricant 2019
            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
