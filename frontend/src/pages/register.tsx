import React from 'react'
import {Formik,Form } from "formik"
import { FormControl, FormLabel, Input, FormErrorMessage, Button } from "@chakra-ui/core";
import {Wrapper} from '../components/wrapper'
import { InputField } from '../components/InputField';
interface registerProps {
 
}



const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper variant="small">
        <Formik
            initialValues={{username:"",password:""}}
            onSubmit={(values)=>{
                console.log(values)
            }}>
            {({isSubmitting})=>(
                <Form>
                    <InputField name="username" placeholder="Username" label="Username"></InputField>
                    <InputField name="password" placeholder="Password" label="Password" type="password"></InputField>
                    <Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">Register</Button>
                </Form>
            )}
        </Formik>     
        </Wrapper>   
  );
}

export default Register 