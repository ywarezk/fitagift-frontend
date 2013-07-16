'''
Created on Apr 18, 2013
the views for workerim-client
@author: Yariv Katz
@copyright: Nerdeez
'''

#===============================================================================
# begin imports
#===============================================================================

from django.shortcuts import render_to_response
from django.template import RequestContext
import os

#===============================================================================
# end imports
#===============================================================================


def spa(request):
    '''
    main spa application
    '''
    
    server_url = 'https://fitagift-backend-dev.herokuapp.com'
    if 'SERVER_URL' in os.environ:
        server_url = os.environ['SERVER_URL']
    return render_to_response(
        'base.html',
        {'SERVER_URL': server_url},
        context_instance=RequestContext(request)
        )
