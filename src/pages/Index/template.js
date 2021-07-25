import request from '@/helper/request.js'
import auth from '@/api/auth.js'
import blog from '@/api/blog.js'

window.auth = auth;

export default {
	data () {
	    return {
			blogs:[],
			total:0,
			page:1,
			currentPage:1
	    }
	 },
	created(){
		this.page = parseInt(this.$route.query.page) || 1
		blog.getIndexBlogs({page : this.page}).then(res=>{
			// console.log(res)
			this.blogs =res.data
			this.total  = res.total
			this.page = res.page
			this.currentPage = this.page
		})
	},
	// mounted(){
	// 	let li = document.querySelector('.el-pager').getElementsByTagName('li')
	// 	// console.log(li)
	// 	li[0].classList.remove('active')
	// 	let i = Number(this.page-1)
	// 	// console.log(i)'
	// 	li[i].classList.add('active')
		
	// },
	methods: {
		onPageChange(newPage){
			blog.getIndexBlogs({page:newPage}).then(res=>{
				// console.log(res)
				this.blogs =res.data
				this.total  = res.total
				this.page = res.page
				this.$router.push({path:'/',query:{page:newPage}})
			})
		}
	 }
}

