import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

interface FeedCardProps {
  post: {
    id: string;
    author: {
      name: string;
      image: string;
      username: string;
    };
    content: string;
    images?: string[];
    timestamp: string;
    likes: number;
    comments: number;
    location?: string;
  };
}

export function FeedCard({ post }: FeedCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-center space-y-0 ">
        <div className="flex w-full flex-nowrap items-center justify-between space-x-3">
          <div className="flex flex-1 items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Link
                  href={`/profile/${post.author.username}`}
                  className="font-semibold hover:underline"
                >
                  {post.author.name}
                </Link>
                {post.location && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {post.location}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Guardar publicación</DropdownMenuItem>
              <DropdownMenuItem>Reportar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
        {post.images && post.images.length > 0 && (
          <div
            className={`grid gap-1 ${
              post.images.length === 1
                ? "grid-cols-1"
                : post.images.length === 2
                ? "grid-cols-2"
                : post.images.length === 3
                ? "grid-cols-2"
                : "grid-cols-2"
            }`}
          >
            {post.images.map((image, index) => (
              <div
                key={index}
                className={`relative ${
                  post.images?.length === 3 && index === 0 ? "col-span-2" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`Post image ${index + 1}`}
                  width={500}
                  height={500}
                  className="rounded-md object-cover"
                  style={{
                    aspectRatio: post.images?.length === 1 ? "16/9" : "1",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between ">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <Heart className="h-5 w-5" />
            <span>{post.likes}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="gap-2">
          <Share2 className="h-5 w-5" />
          <span>Compartir</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
