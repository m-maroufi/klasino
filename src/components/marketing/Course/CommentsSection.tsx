"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

type Comment = {
  id: number;
  author: string;
  date: string;
  text: string;
  replies?: Comment[];
};

const sampleComments: Comment[] = [
  {
    id: 1,
    author: "مهدی",
    date: "۱۴۰۴/۰۶/۰۱",
    text: "این خیلی جالب بود 👌",
    replies: [
      {
        id: 2,
        author: "علی",
        date: "۱۴۰۴/۰۶/۰۲",
        text: "دقیقا منم همین حسو داشتم",
        replies: [
          {
            id: 4,
            author: "مهدی",
            date: "۱۴۰۴/۰۶/۰۲",
            text: "خوشحالم که مفید بوده برات!",
          },
          {
            id: 5,
            author: "سارا",
            date: "۱۴۰۴/۰۶/۰۲",
            text: "منم همینطور، خیلی عالی بود!",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    author: "موسی",
    date: "۱۴۰۴/۰۶/۰۳",
    text: "من یه نکته اضافه دارم...",
  },
];

function CommentItem({
  comment,
  level = 0,
}: {
  comment: Comment;
  level?: number;
}) {
  const [replying, setReplying] = useState(false);

  return (
    <div style={{ marginInlineStart: level * 20 }} className="mb-3">
      <Card className="p-3">
        <CardContent className="p-0">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{comment.author}</span>
            <span className="text-sm text-muted-foreground">
              {comment.date}
            </span>
          </div>
          <p className="mb-2 font-vazir font-light">{comment.text}</p>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-bold"
            onClick={() => setReplying(!replying)}
          >
            {replying ? "بستن" : "ثبت پاسخ"}
          </Button>

          {replying && (
            <div className="mt-2">
              <textarea
                className="w-full border rounded-md p-2 text-sm"
                placeholder="پاسخ خود را بنویسید..."
              />
              <div className="mt-2 flex gap-2">
                <Button size="sm">ارسال</Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setReplying(false)}
                >
                  لغو
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} level={level + 1} />
      ))}
    </div>
  );
}

export function CommentsSection() {
  return (
    <div className="space-y-4">
      {sampleComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
