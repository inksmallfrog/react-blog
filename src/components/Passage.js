/*
* @Author: inksmallfrog
* @Date:   2017-04-28 14:36:09
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-28 23:30:26
*/

'use strict';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Link } from 'react-router-dom';

import style from 'styles/passage.css';

import passages from 'data/passages.json';

export default class Passage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content: '',
            metadata: {
                title: "untitled",
                category: "default"
            },
            previousPassage: null,
            nextPassage: null
        }
        this.getPassage(props.match.params.id);
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.match.params.id != this.props.match.params.id) this.getPassage(nextProps.match.params.id);
        return false; //the getPassage method will trigger update
    }
    getPassage(passagePath){
        let currentIndex = passages.findIndex((passage) => {
            return passage.src == passagePath;
        });
        if(currentIndex < 0 || currentIndex >= passages.length){
            //err
        }
        let previousPassage = (passages.length == currentIndex + 1) ? null : passages[currentIndex + 1],
            nextPassage = (currentIndex == 0) ? null : passages[currentIndex - 1];
        fetch('/' + passagePath)
            .then((response) => {
                return response.text();
            })
            .then((rawMarkdown) => {
                let metadata,
                    metadataMap = {};
                //record & remove metadata
                let markdown = rawMarkdown.replace(/---((.|\n|\r)*)?---/, (value)=>{
                    metadata = value;
                    return '';
                });
                if(!metadata){
                    //err handler
                }
                else{
                    //Save metadata to map
                    metadata.split('\n').forEach((value)=>{
                        let keyValue = value.split(':');
                        if(keyValue.length < 2) return;
                        else{
                            metadataMap[keyValue[0]] = keyValue[1];
                        }
                    })
                }
                if(!metadataMap.title){ metadataMap.title = 'untitled'; }
                if(!metadataMap.category){ metadataMap.category = 'default'; }
                this.setState({
                    content: markdown,
                    metadata: metadataMap,
                    previousPassage: previousPassage,
                    nextPassage: nextPassage
                });
                this.forceUpdate();
                window.scrollTo(0, 0);
            });
    }
    render(){
        const previous = this.state.previousPassage,
              next = this.state.nextPassage;
        let previousLink = previous ?
                    <div className={style.link}><Link to={'/passage/' + previous.src}>上一篇：{previous.title}</Link></div>
                    : <a className={style.linkDisable}>这是最后一篇哟，感谢阅读</a>,
            nextLink = next ?
                    <div className={style.link}><Link to={'/passage/' + next.src}>下一篇：{next.title}</Link></div>
                    : <a className={style.linkDisable}>下一篇？敬请期待</a>;
        return (
            <article>
                <h1>{this.state.metadata.title}</h1>
                <ReactMarkdown source={this.state.content} className={style.passage}/>
                {nextLink}
                {previousLink}
            </article>
        )
    }
}
