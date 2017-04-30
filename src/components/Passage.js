/*
* @Author: inksmallfrog
* @Date:   2017-04-28 14:36:09
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 21:27:39
*/

'use strict';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Link } from 'react-router-dom';

import style from 'styles/passage.css';

import passages from 'data/passages.json';

import passageParser from 'lib/passageParser';

export default class Passage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content: '',
            metadata: {
                title: 'untitled',
                category: 'default',
                date: '2017-04-27'
            },
            previousPassage: null,
            nextPassage: null
        }
        this.getPassage(props.match.params.id);
    }
    shouldComponentUpdate(nextProps){
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
        fetch('https://raw.githubusercontent.com/inksmallfrog/react-blog/gh-pages/passages/' + passagePath)
            .then((response) => {
                return response.text();
            })
            .then((rawMarkdown) => {
                /*let metadata,
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
                if(!metadataMap.category){ metadataMap.category = 'default'; }*/
                let structur = passageParser(rawMarkdown);
                this.setState({
                    content: structur.body,
                    metadata: structur.metadata,
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
                    <div className={style.link}><Link to={'/passages/' + previous.src}>上一篇：{previous.title}</Link></div>
                    : <a className={style.linkDisable}>这是最后一篇哟，感谢阅读</a>,
            nextLink = next ?
                    <div className={style.link}><Link to={'/passages/' + next.src}>下一篇：{next.title}</Link></div>
                    : <a className={style.linkDisable}>下一篇：敬请期待</a>;
        return (
            <article>
                <h1 className={style.title}>{this.state.metadata.title}</h1>
                <aside>
                    <div className={style.category}>分类：{this.state.metadata.category}</div>
                    <div className={style.pubTime}>发表于：{this.state.metadata.date}</div>
                </aside>
                <ReactMarkdown source={this.state.content} className={style.passage} softBreak={'br'}/>
                {previousLink}
                {nextLink}
            </article>
        )
    }
}
