"use client";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from "@/components/global/editor/components/Headings";
import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useCallback } from "react";
import DropZone from "./DropZone";
import Paragraph from "@/components/global/editor/components/Paragraph";
import TableComponents from "@/components/global/editor/components/TableComponent";
import ColumnComponents from "@/components/global/editor/components/ColumnComponent";
import CustomImage from "../../../../../../components/global/editor/components/ImageComponent";
import BlockQuote from "@/components/global/editor/components/BlockQuote";
import NumberList, {
  BulletList,
  TodoList,
} from "@/components/global/editor/components/ListComponent";
import CalloutBox from "@/components/global/editor/components/CalloutBox";
import CodeBlock from "@/components/global/editor/components/CodeBlock";
import TableOfContents from "@/components/global/editor/components/TableOfContents";
import Divider from "@/components/global/editor/components/Divider";

type MasterRecursiveComponentProps = {
  content: ContentItem;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId: string;
  index?: number;
};

const ContentRendered: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, onContentChange, slideId, index, isPreview, isEditable }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value);
      },
      [content.id, onContentChange]
    );

    const commonProps = {
      placeholder: content.placeholder,
      value: content.content as string,
      onChange: handleChange,
      isPreview: isPreview,
    };

    //WIP: complete types
    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    };

    switch (content.type) {
      case "heading1":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading1 {...commonProps} />
          </motion.div>
        );
      case "heading2":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Heading2 {...commonProps} />
          </motion.div>
        );
      case "heading3":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Heading3 {...commonProps} />
          </motion.div>
        );
      case "heading4":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Heading4 {...commonProps} />
          </motion.div>
        );
      case "title":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Title {...commonProps} />
          </motion.div>
        );

      case "paragraph":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Paragraph {...commonProps} />
          </motion.div>
        );

      case "table":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <TableComponents
              content={content.content as string[][]}
              onChange={(newContent) =>
                onContentChange(
                  content.id,
                  newContent !== null ? newContent : ""
                )
              }
              initialColSize={content.initialColumns}
              initialRowSize={content.initialRows}
              isPreview={isPreview}
              isEditable={isEditable}
            />
          </motion.div>
        );

      case "resizable-column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div {...animationProps} className="w-full h-full">
              <ColumnComponents
                content={content.content as ContentItem[]}
                className={content.className}
                onContentChange={onContentChange}
                slideId={slideId}
                isPreview={isPreview}
                isEditable={isEditable}
              />
            </motion.div>
          );
        }
        return null;

      case "image":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <CustomImage
              src={content.content as string}
              alt={content.alt || "image"}
              className={content.className}
              isPreview={isPreview}
              contentId={content.id}
              onContentChange={onContentChange}
              isEditable={isEditable}
            />
          </motion.div>
        );

      case "blockquote":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <BlockQuote>
              <Paragraph {...commonProps} />
            </BlockQuote>
          </motion.div>
        );
      case "numberedList":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <NumberList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );

      case "bulletList":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <BulletList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );

      case "todoList":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <TodoList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );

      case "calloutBox":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <CalloutBox
              type={content.callOutType || "info"}
              className={content.className}
            >
              <Paragraph {...commonProps} />
            </CalloutBox>
          </motion.div>
        );

      case "codeBlock":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <CodeBlock
              code={content.code}
              language={content.language}
              onChange={() => {}}
              className={content.className}
            />
          </motion.div>
        );

      case "tableOfContents":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <TableOfContents
              items={content.content as string[]}
              onItemClick={(id) => {
                console.log(`Navigate to section: ${id}`);
              }}
              className={content.className}
            />
          </motion.div>
        );

      case "divider":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Divider className={content.className as string} />
          </motion.div>
        );

      case "column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              {...animationProps}
              className={cn("w-full h-full flex flex-col", content.className)}
            >
              {content.content.length > 0 ? (
                (content.content as ContentItem[]).map(
                  (subItem: ContentItem, subIndex: number) => (
                    <React.Fragment key={subItem.id || `item-${subIndex}`}>
                      {!isPreview &&
                        !subItem.restrictToDrop &&
                        subIndex === 0 &&
                        isEditable && (
                          <DropZone
                            index={0}
                            parentId={content.id}
                            slideId={slideId}
                          />
                        )}
                      <MasterRecursiveComponent
                        content={subItem}
                        onContentChange={onContentChange}
                        isPreview={isPreview}
                        slideId={slideId}
                        index={subIndex}
                        isEditable={isEditable}
                      />
                      {!isPreview && !subItem.restrictToDrop && isEditable && (
                        <DropZone
                          index={subIndex + 1}
                          parentId={content.id}
                          slideId={slideId}
                        />
                      )}
                    </React.Fragment>
                  )
                )
              ) : isEditable ? (
                <DropZone index={0} parentId={content.id} slideId={slideId} />
              ) : null}
            </motion.div>
          );
        }
        return null;

      default:
        return null;
    }
  }
);

ContentRendered.displayName = "ContentRendered";

export const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> =
  React.memo(
    ({
      content,
      onContentChange,
      slideId,
      index,
      isPreview = false,
      isEditable = false,
    }) => {
      if (isPreview) {
        return (
          <ContentRendered
            content={content}
            onContentChange={onContentChange}
            isPreview={isPreview}
            isEditable={isEditable}
            slideId={slideId}
            index={index}
          />
        );
      }
      return (
        <React.Fragment>
          <ContentRendered
            content={content}
            onContentChange={onContentChange}
            isPreview={isPreview}
            isEditable={isEditable}
            slideId={slideId}
            index={index}
          />
        </React.Fragment>
      );
    }
  );

MasterRecursiveComponent.displayName = "MasterRecursiveComponent";
