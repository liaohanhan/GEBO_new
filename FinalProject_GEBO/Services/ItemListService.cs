using FinalProject_GEBO.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalProject_GEBO.Models;
using FinalProject_GEBO.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject_GEBO.Services
{
    public class ItemListService
    {
        private _10801Context _context = new _10801Context();

        
        public List<CategoryList> GetAll(int memberid)
        {
            var allCategory_ItemList = _context.CategoryList.Include(x => x.ItemList).Where(x => x.MemberId == memberid).ToList();
            return allCategory_ItemList;
        }

       
        public List<ItemList> GetItem(int categoryid)
        {
            //var getcategory = _context.CategoryList.SingleOrDefault(x=>x.Id==categoryid);
            var get_items = _context.ItemList.Where(x => x.CategoryId == categoryid).ToList();
            return get_items;

        }
        
   

        public ItemList GetItemList(int id)
        {
            var allItemList_ItemList = _context.ItemList.SingleOrDefault(x => x.Id == id);
            return allItemList_ItemList;
        }
        

        public string Adding(CategoryList categoryList)
        {

            try
            {
                _context.CategoryList.Add(categoryList);
                _context.SaveChanges();
                return "success";
            }
            catch(Exception e) {
                return "false" + e.ToString();
            }

        }

        public string AddingItemList(ItemList itemList)
        {
            try
            {
                _context.ItemList.Add(itemList);
                _context.SaveChanges();
                return "success";
            }
            catch (Exception e)
            {
                return "false" + e.ToString();
            }
        }

        public string DeleteCategory(int id)
        {
            try
            {
                var deleteCategory = _context.CategoryList.Include(x => x.ItemList).SingleOrDefault(x => x.Id == id);
                var deleteItem = deleteCategory.ItemList.ToList();
                _context.ItemList.RemoveRange(deleteItem);
                _context.CategoryList.Remove(deleteCategory);
                _context.SaveChanges();
                return "success";
            }
            catch (Exception e)
            {
                return "false" + e.ToString();
            }
        }

      

        public string DeleteItemList(int id)
        {
            try 
            {
                var deleteItem = _context.ItemList.SingleOrDefault(x => x.Id == id);
                _context.ItemList.Remove(deleteItem);
                _context.SaveChanges();
                return "success";
            } 
            catch (Exception e)
            {
                return "false" + e.ToString();
            }
            
        }

        public string EditCategory(int categoryId, CategoryList category)
        {
            try{
                if (category != null)
                {
                    var old_category = _context.CategoryList.SingleOrDefault(x => x.Id == categoryId);
                    if (old_category == null)
                    {
                        return "找不到資料";
                    }
                    else {
                        old_category.Title = category.Title;
                        old_category.Description = category.Description;

                        _context.SaveChanges();
                        return "success";
                         }
                }
                else
                {
                    return "要有內容喔";
                }
            } 
            catch (Exception e)
            {
                return "false" + e.ToString();
            }
        }
        public string EditItem(int itemlistId, ItemList item)
        {
            try
            {
                if (item != null)
                {
                    var old_item = _context.ItemList.SingleOrDefault(x => x.Id == itemlistId);
                    old_item.Item = item.Item;
                    old_item.Status = item.Status;

                    _context.SaveChanges();
                    return "success";
                }
                else
                {
                    return "要有內容喔";
                }

            }
            catch (Exception e)
            {
                return "false" + e.ToString();
            }
        }
        public string EditCategoryStatus(int categoryId)
        {
            try
            {
                
                
                    var old_status = _context.CategoryList.SingleOrDefault(x => x.Id == categoryId);
                if (old_status.Status == true) { old_status.Status = false; }
                else { old_status.Status = true; }
                    _context.SaveChanges();
                    return old_status.Status.ToString();

                
            }
            catch (Exception e)
            {
                return "false" + e.ToString();
            }
        }

    }
}
