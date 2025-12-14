"use client"
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

type Update ={
    version: string;
    date: string; // ISO: "2025-07-25"
    duration: number; // In days
    title: string;
    description: string;
};

export default function UpdateToast(){
      
    const updateVersion = "1";
    
    const { toast } = useToast();
    const updates: Update[] = [
        {
            version: "1",
            date:"2025-12-14",
            duration: 45,
            title:"🌟Nova Funcionalidade!🌟",
            description:"Experimente usar a barra de pesquisa! 🔎"
            
        }
    ]
    useEffect(()=>{
        const lastUpdateShown = localStorage.getItem("lastUpdate");
        const today = new Date();
        if(lastUpdateShown!=updateVersion){
            const currentUpdate = updates.find(update=>update.version==updateVersion);
            if(currentUpdate!=undefined){
                const finalDateToShow = new Date(currentUpdate.date);
                finalDateToShow.setDate(finalDateToShow.getDate()+currentUpdate.duration);
                if(finalDateToShow>=today){
                    toast(
                        {
                            title: currentUpdate.title,
                            description: currentUpdate.description
                        }
                    )
                    localStorage.setItem("lastUpdate", currentUpdate.version);
                }
            }
        }
        
    },[toast, updateVersion]);
    return null

}