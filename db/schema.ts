import { pgTable, serial, text, uuid, timestamp, boolean, real, index, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const courses = pgTable('courses', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: text('user_id').notNull(),
    title: text('title').notNull(),
    description: text('description'),
    imageUrl: text('image_url'),
    price: real('price'),
    isPublished: boolean('is_published').default(false),
    categoryId: uuid('category_id'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
}, (table) => {
    return {
        categoryIndex: index('category_index').on(table.categoryId)
    };
});

export const categories = pgTable('categories', {
    id: uuid('id').defaultRandom().primaryKey()
});

export const attachments = pgTable('attachments', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    url: text('url').notNull(),
    courseId: uuid('course_id').references(() => courses.id, { onDelete: 'cascade' }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
}, (table) => {
    return {
        courseIndex: index('course_index').on(table.courseId)
    };
});

// Relations
export const courseRelations = relations(courses, ({ one, many }) => ({
    category: one(categories, {
        fields: [courses.categoryId],
        references: [categories.id],
    }),
    attachments: many(attachments)
}));

export const categoryRelations = relations(categories, ({ many }) => ({
    courses: many(courses)
}));

export const attachmentRelations = relations(attachments, ({ one }) => ({
    course: one(courses, {
        fields: [attachments.courseId],
        references: [courses.id],
    })
}));
