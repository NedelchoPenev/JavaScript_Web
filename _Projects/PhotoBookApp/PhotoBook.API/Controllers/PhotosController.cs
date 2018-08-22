using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PhotoBook.API.Data;
using PhotoBook.API.Helpers;
using PhotoBook.API.Models;

namespace PhotoBook.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IPhotoBookRepository repo;
        private readonly IMapper mapper;
        // private readonly IOptions<CloudinarySettings> cloudinaryConfig;

        public PhotosController(
            IPhotoBookRepository repo,
            IMapper mapper
        // IOptions<CloudinarySettings> cloudinaryConfig
        )
        {
            this.repo = repo;
            this.mapper = mapper;
            // this.cloudinaryConfig = cloudinaryConfig;
        }

        [HttpGet]
        public async Task<IActionResult> GetPhotos()
        {
            var photos = await this.repo.GetPhotos();

            var photoDto = this.mapper.Map<PhotoReturnDto[]>(photos);

            return Ok(photoDto);
        }

        [HttpPost("{userId}/like/{photoId}")]
        public async Task<IActionResult> LikePhoto(int userId, int photoId)
        {
            var like = await this.repo.GetLikePhoto(userId, photoId);

            if (like != null)
            {
                return BadRequest("You already like this photo");
            }

            if (await this.repo.GetPhoto(photoId) == null)
            {
                return NotFound();
            }

            like = new PhotoLike
            {
                PhotoId = photoId,
                LikerId = userId
            };

            this.repo.Add<PhotoLike>(like);

            if (await this.repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to like photo");
        }

        
        [HttpGet("favorite/{userId}")]
        public async Task<IActionResult> GetFavoritePhotos(int userId)
        { 
            var photos = await this.repo.GetFavoritePhotos(userId);

            var photoDto = this.mapper.Map<PhotoReturnDto[]>(photos);

            return Ok(photoDto);
        }
    }
}