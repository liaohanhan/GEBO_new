using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalProject_GEBO.Models;
using FinalProject_GEBO.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinalProject_GEBO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemListController : ControllerBase
    {
        private ItemListService itemlistService = new ItemListService();

        [HttpGet("CategoryList/{memberid}")]

        public List<CategoryList> GetAll(int memberid)
        {
            var getitem = itemlistService.GetAll(memberid);
            return getitem;
        }
        [HttpGet("Category/{categoryid}")]
        public List<ItemList> GetItem(int categoryid)
        {
            var getitem = itemlistService.GetItem(categoryid);
            return getitem;
        }
       
        [HttpGet("Itemlist/{id}")]
        public ItemList GetItemList(int id)
        {
            var getitemlist = itemlistService.GetItemList(id);
            return getitemlist;
        }
        [HttpPost("Category")]
        public String AddCategoryList(CategoryList categoryList)
        {
            var addcategory = itemlistService.Adding(categoryList);
            return addcategory;
        }

        [HttpPost("ItemList")]
        public String AddItemList(ItemList itemList)
        {
            var additem = itemlistService.AddingItemList(itemList);
            return additem;
        }
        [HttpDelete("Category/{id}")]
        public string DeleteCategory(int id)
        {
            var deletecategory = itemlistService.DeleteCategory(id);
            return deletecategory;
        }
        [HttpDelete("ItemList/{id}")]
        public string DeleteItemList(int id)
        {
            var deleteitemlist = itemlistService.DeleteItemList(id);
            return deleteitemlist;
        }
        [HttpPut("Category/{categoryId}")]
        public string EditCategory(int categoryId,CategoryList category)
        {
            var editcategory = itemlistService.EditCategory(categoryId, category);
            return editcategory;
        }
        [HttpGet("Category/status/{categoryId}")]
        public string EditCategoryStatus(int categoryId)
        {
            var editstatus = itemlistService.EditCategoryStatus(categoryId);
            return editstatus;
        }
        [HttpPut("ItemList/{itemlistId}")]
        public string EditItem(int itemlistId, [FromBody]ItemList item)
        {
            var edititem = itemlistService.EditItem(itemlistId,item);
            return edititem;
        }
        
    }

    }

