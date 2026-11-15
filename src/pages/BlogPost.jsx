import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../api'
export default function BlogPost() { const {slug}=useParams();const [post,setPost]=useState(null);const [error,setError]=useState(false);useEffect(()=>{api.get(`/blogs/${encodeURIComponent(slug)}`).then(({data})=>setPost(data.blog)).catch(()=>setError(true))},[slug]);return <><Navbar/><main className="pt-32 pb-20 brand-shell max-w-3xl">{error?<p>Post not found.</p>:!post?<p>Loading article…</p>:<article><Link to="/blog" className="text-[var(--color-primary)]">← Journal</Link><p className="mt-8 section-kicker">{post.publishedAt&&new Date(post.publishedAt).toLocaleDateString('en-BD')}</p><h1 className="display-title text-5xl mt-4">{post.title}</h1>{post.image&&<img src={post.image} alt="" className="w-full rounded-xl mt-8"/>}<p className="text-xl text-[var(--color-muted)] mt-8">{post.excerpt}</p><div className="whitespace-pre-line leading-8 mt-7">{post.content}</div></article>}</main><Footer/></> }
