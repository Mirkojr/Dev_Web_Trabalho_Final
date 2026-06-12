-- CreateIndex
CREATE INDEX "Category_status_idx" ON "Category"("status");

-- CreateIndex
CREATE INDEX "Category_createdById_idx" ON "Category"("createdById");

-- CreateIndex
CREATE INDEX "Ingredient_status_idx" ON "Ingredient"("status");

-- CreateIndex
CREATE INDEX "Ingredient_createdById_idx" ON "Ingredient"("createdById");
