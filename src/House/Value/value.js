import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState

} from 'react-accessible-accordion'
import "react-accessible-accordion/dist/fancy-example.css"
;
import {MdOutlineArrowDropDown} from 'react-icons/md'
import './value.css'
import React from 'react';
import data2 from '../utils/c2';
import { useState } from 'react';
export default function Value(){
    return(
        <section className='v-wrapper'>
          <div className='v-container'>
            <div className='v-left'>
                <div className='image-container'>
            <img src='header.avif'alt=''/>
            </div>
            </div>
            <div className='v-right'>
                <span className='orangeText'>Our Value</span>
                <span className='primaryText'>Value We Give to You  </span>
                <span className='secondaryText'>We always ready to help by providijng the best services for you.<br/>
                We beleive a good blace to live can make your life better
                </span>
                <Accordion className='accordion' allowMultipleExpanded={false} preExpanded={[0]}>
                    { 
                    data2.map((item,i)=>{
                     
                        return(
                            <AccordionItem className={'accordionItem ' } key={i} uuid={i}>
                                <AccordionItemHeading>
                                    <AccordionItemButton className='accordionButton'>
                                        
                                        <div className='icon'>{item.icon}</div>
                                        <span className='primaryText'>{item.heading}</span>
                                        <div className='icon'></div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p className='scondaryText'>{item.detail}</p>

                                </AccordionItemPanel>

                            </AccordionItem>

                        )
                    })

                    }
                </Accordion>

            </div>


            </div>  

        </section>
      
    )
}