import { Button, TextField } from "@mui/material";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from "../../store/slices/getCategoriesSlice";
import { addCategory } from "../../store/slices/addCategorySlice";
import { AppDispatch } from "../../store/store";


export default function Dashboard(){
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getCategories());
      }, [dispatch]);
      
      useEffect(() => {
        dispatch(getCategories());
      }, []);

      const handleAddCategory = () => {
        const newCategory = { name: 'New Category' };
        dispatch(addCategory(newCategory));
      };
    return(
        <>
           <TextField>Welcome to Generic Template Dashboard</TextField>
        </>
    );
}