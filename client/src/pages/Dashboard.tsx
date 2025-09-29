import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { linkSchema, type LinkData } from "@/lib/validation"

type Link = {
  _id: string
  url: string
  title?: string
  description?: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LinkData>({
    resolver: zodResolver(linkSchema),
  })

  // Fetch links on mount
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/signin")
      return
    }

    fetch("http://localhost:3000/api/v1/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setLinks(data.content || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [navigate])

  // Add link with validation
  const onSubmit = async (values: LinkData) => {
    const token = localStorage.getItem("token")
    if (!token) return

    const res = await fetch("http://localhost:5000/api/v1/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    const data = await res.json()
    if (res.ok) {
      setLinks((prev) => [...prev, data.content])
      reset() // clear form
    }
  }

  // Delete link
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")
    if (!token) return

    await fetch(`http://localhost:5000/api/content/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })

    setLinks((prev) => prev.filter((link) => link._id !== id))
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold">Second Brain</h1>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto mt-8 p-4 space-y-6">
        {/* Add link form */}
        <Card>
          <CardHeader>
            <CardTitle>Add a new link</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Optional title" {...register("title")} />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="url">URL</Label>
                <Input id="url" type="url" placeholder="https://example.com" {...register("url")} />
                {errors.url && (
                  <p className="text-sm text-red-500">{errors.url.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Save Link
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Links list */}
        <section>
          {loading ? (
            <p>Loading your links...</p>
          ) : links.length === 0 ? (
            <p className="text-center text-gray-500">No links yet. Add one above!</p>
          ) : (
            <div className="space-y-3">
              {links.map((link) => (
                <Card key={link._id}>
                  <CardHeader>
                    <CardTitle className="text-base">{link.title || link.url}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {link.url}
                    </a>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(link._id)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
