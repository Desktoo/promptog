"use client";

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const[searchText, setSearchText] = useState('');
  const[posts, setPosts] = useState([]);
  const[filtered, setFiltered] = useState([])

  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json();

      setPosts(data);
      setFiltered(data)
    }

    fetchPosts();

  },[])
  

  const handleSearchChange = (input) => { 

    const value = typeof input === 'string' ? input : input.target.value

    setSearchText(value)
    
    const inputQuery = value.toLowerCase()

    const filteredPosts = posts.filter((post) => 
       post.tag?.toLowerCase().includes(inputQuery.startsWith("#") ? inputQuery : `#${inputQuery}`) ||
       post.creator?.username?.toLowerCase().includes(inputQuery)
    )

    console.log(filteredPosts)

    setFiltered(filteredPosts)
  }

const handleTagSearch = (tag) => {
  const cleanTag = tag.replace(/^#/, '')
  setSearchText(cleanTag)
  handleSearchChange(cleanTag)
}



  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder='Search for tags or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={filtered}
        handleTagClick={handleTagSearch}

      />
    </section>
  )
}

export default Feed