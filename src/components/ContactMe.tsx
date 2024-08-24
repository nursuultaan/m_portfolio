import { Button, DatePicker, Form, Input } from 'antd';
import React from "react";
import {HomeOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";

const { TextArea } = Input;
import emailjs from '@emailjs/browser';

const ContactMe: React.FC = () => {

    const [form] = Form.useForm();


    const sendEmail = () => {

        const formData = form.getFieldsValue();
        console.log(formData);

        emailjs
            .send('service_jn40qcu', 'template_kmwtpn2', formData, {
                publicKey: '0Tv2iV6EKy_uzruSy',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };



    return (
        <div className={"w-full h-full bg-yellow-300"}>
            <div className="container w-3/4 h-full mx-auto  flex flex-col justify-center  gap-5 p-3">

                <div className={"text-center"}>
                    <h1 className={"text-3xl mb-3"}>Contact</h1>

                </div>


                <div className={" p-3 flex gap-4"}>

                    <div className="contact-details flex flex-1 justify-center items-center">
                        <ul className={"flex flex-col gap-4 text-[20px]"}>
                            <li className={"flex gap-4"}>
                                <HomeOutlined/>
                                <span>Chicago ,IL</span>
                            </li>

                            <li className={"flex gap-4"}>
                                <PhoneOutlined/>
                                <span>850-896-9009</span>
                            </li>

                            <li className={"flex gap-4"}>
                                <MailOutlined/>
                                <span>sultansofteng@gmail.com</span>
                            </li>
                        </ul>


                    </div>

                    <Form
                        form={form}
                        onFinish={sendEmail}
                        layout="horizontal"
                        className=" flex-1 gap-4"
                        labelAlign="left"
                    >
                        <Form.Item
                            name={"person"}
                            className=""
                        >
                            <Input placeholder={"name or email"} className={"placeholder:font-mono"}/>
                        </Form.Item>

                        <Form.Item
                            name={"interviewDate"}
                            className=""
                        >
                            <DatePicker placeholder="Schedule interview (Optional)" className="w-full placeholder:font-mono"/>
                        </Form.Item>

                        <Form.Item
                            className="w-full"
                            name={"message"}
                        >
                            <TextArea placeholder={"Message"} className={"placeholder:font-mono"} rows={10}/>
                        </Form.Item>

                        <Form.Item className="flex justify-center  ">
                            <Button htmlType={"submit"}
                                    className={"px-10 py-4  font-mono border-2 text-[16px] placeholder:font-mono"}>Send</Button>
                        </Form.Item>


                    </Form>


                </div>


            </div>

        </div>

    );
};

export default ContactMe;
