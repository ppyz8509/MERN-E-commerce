import { useQueries, useQuery  } from "@tanstack/react-query";
import useAxiosPublic  from "./useAxiosPublic";
import useAuth  from "./useAuth";
import React from "react";



const useAdmin = () => {
        const {user} = useAuth()
        const axiosSecure = useAxiosSecure()
        const { data:isAdmin,isPending: isAdmimLoading } = useQuery({
            queryKey:[user?.email,"isAdmin"],
            queryFn:async ()=>{
                const res = await axiosSecure.get(`/users/admin${user?.email}`);
                return res.data;
            }
           })
           return [isAdmin, isAdmimLoading]
        }
    


export default useAdmin





















