import blog from '@/api/blog'
import { mapGetters } from  'vuex'

export default {
  data () {
    return {
      blogs:[],
      page:1,
      total:0,
      currentPage:1
    }
  },
  computed:{
    ...mapGetters(['user'])
  },
  created(){
    this.page = parseInt(this.$route.query.page) || 1
    // this.userId = this.$route.params.userId
    blog.getBlogsByUserId(this.user.id,{page:this.page})
      .then(res=>{
        // console.log(res)
        // debugger
        this.blogs = res.data 
        this.page= res.page
        this.currentPage = this.page
        this.total = res.total
        // if(res.data.length>0){
        //   this.user = res.data[0].user
        // }
      })
  },
  methods:{
    async onDelete(blogId){
      await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await blog.deleteBlog({blogId})
      this.$message('删除成功');
      this.blogs  =this.blogs.filter(blog => blog.id != blogId)
      // .then(() => {
      //   return blog.deleteBlog({blogId})
      //   .then(()=>{
      //     this.$message('删除成功')
      //   })
      // })
    },
    onPageChange(newPage){
      blog.getBlogsByUserId(this.user.id,{page:newPage}).then(res=>{
				console.log(res)
				this.blogs =res.data
				this.total  = res.total
				this.page = res.page
				this.$router.push({path: `/my`,query:{page:newPage}})
			})
    },
    splitDate(dataStr){
      let dateObj = typeof dataStr === 'object'?dataStr:new Date(dataStr)
      return{
        date:dateObj.getDate(),
        month:dateObj.getMonth()+1,
        year:dateObj.getFullYear()
      }
    }
  }
}
