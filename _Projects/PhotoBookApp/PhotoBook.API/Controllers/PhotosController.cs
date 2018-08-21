using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PhotoBook.API.Data;
using PhotoBook.API.Helpers;

namespace PhotoBook.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IPhotoBookRepository repo;
        private readonly IMapper mapper;
        private readonly IOptions<CloudinarySettings> cloudinaryConfig;

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
    }
}