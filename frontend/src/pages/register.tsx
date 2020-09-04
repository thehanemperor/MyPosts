import React from 'react'
import {Formik,Form } from "formik"
import { FormControl, FormLabel, Input, FormErrorMessage, Button } from "@chakra-ui/core";
import {Wrapper} from '../components/Wrapper'
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router'
interface registerProps {
 
}



const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter()
    const [,register] = useRegisterMutation()
    return (
        <Wrapper variant="small">
        <Formik
            initialValues={{username:"",password:""}}
            onSubmit={async(values,{ setErrors })=>{
                console.log(values)
                const response = await register(values)
                console.log('response',response)
                if (response.data?.register.errors){
                    console.log(toErrorMap(response.data.register.errors))
                    //setErrors({username:"error"})
                    setErrors(toErrorMap(response.data.register.errors))
                }else if (response.data?.register.user){
                    // registered successfully
                    router.push("/")
                }
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